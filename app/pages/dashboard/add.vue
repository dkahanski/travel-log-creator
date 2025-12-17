<script setup lang="ts">
import type { FetchError } from "ofetch";
import type { InsertLocationSchema } from "~~/lib/db/schema";
import { toTypedSchema } from "@vee-validate/zod";
import { insertLocationSchema } from "~~/lib/db/schema";
import InputField from "~/components/ui/input-field.vue";

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const serverError = ref("");
const pendignOnSubmit = ref(false);
const submitted = ref(false);

const { meta, handleSubmit, errors, setErrors } = useForm<InsertLocationSchema>({
  validationSchema: toTypedSchema(insertLocationSchema),
  initialValues: {
    name: "",
    description: "",
    lat: 0,
    long: 0,
  },
});

onBeforeRouteLeave(() => {
  if (meta.value.dirty && !submitted.value) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you shoure you want to leave? All unsaved changes will be lost.");
    if (!confirm) {
      return false;
    }

    return true;
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    serverError.value = "";
    pendignOnSubmit.value = true;

    await $csrfFetch("/api/locatiion", {
      method: "POST",
      body: values,
    });

    submitted.value = true;

    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;

    serverError.value = error.data?.statusMessage || "An unknown error occured.";

    if (error?.data) {
      setErrors(error.data?.data);
    }
  }
  finally {
    pendignOnSubmit.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col max-w-md m-auto gap-8 pt-4">
    <div class="flex flex-col gap-2">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you heve traveled or will traverl to. It can be a city, country, state or point of interests. You can add specific times you visited this location after additing it.
      </p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <InputField
        label="Name"
        name="name"
        :error="errors.name"
        :disabled="pendignOnSubmit"
      />
      <InputField
        label="Description"
        name="description"
        type="textarea"
        :error="errors.description"
        :disabled="pendignOnSubmit"
      />
      <InputField
        label="Latitude"
        name="lat"
        type="number"
        :error="errors.lat"
        :disabled="pendignOnSubmit"
      />
      <InputField
        label="Longitude"
        name="long" type="number"
        :error="errors.long"
        :disabled="pendignOnSubmit"
      />

      <div v-if="serverError" role="alert" class="alert alert-error">
        <span>{{ serverError }}</span>
      </div>

      <div class="flex gap-4 justify-end my-4">
        <button
          :disabled="pendignOnSubmit"
          class="btn btn-outline"
          type="button"
          @click="router.back()"
        >
          Cancel
        </button>
        <button :disabled="!meta.valid || pendignOnSubmit" class="btn btn-primary">
          <span v-if="pendignOnSubmit" class="loading loading-spinner loading-xs" />
          Add
        </button>
      </div>
    </form>
  </div>
</template>
