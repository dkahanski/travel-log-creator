<script lang="ts" setup>
const authStore = useAuthStore();

onMounted(() => {
  authStore.signOut();
});
</script>

<template>
  <div class="card container mx-auto min-h-64 bg-base-300 flex justify-center items-center gap-4 mt-4 text-center px-12">
    <span class="loading loading-spinner loading-xl" />
  </div>
</template>
