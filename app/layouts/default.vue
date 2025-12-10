<script lang="ts" setup>
const store = useAuthStore();
await store.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar />
    <main class="flex flex-1">
      <slot />
    </main>
  </div>
</template>
