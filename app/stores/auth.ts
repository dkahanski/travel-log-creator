import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const sesion = authClient.useSession();
  const user = computed(() => sesion.value.data?.user);
  const loading = computed(() => sesion.value.isPending || sesion.value.isRefetching);

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
  };

  const signOut = async () => {
    await authClient.signOut();
    navigateTo("/");
  };

  return { loading, signIn, signOut, user };
});
