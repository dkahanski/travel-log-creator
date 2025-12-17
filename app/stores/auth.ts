import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();
type SessionData = Awaited<ReturnType<typeof authClient.useSession>>;

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<SessionData | null>(null);
  const loading = ref(false);

  const init = async () => {
    loading.value = true;
    const data = await authClient.useSession(useFetch);

    session.value = data;
    loading.value = false;
  };

  const user = computed(() => session.value?.data?.user);

  const signIn = async () => {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  };

  const signOut = async () => {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo("/");
  };

  return { init, loading, signIn, signOut, user };
});
