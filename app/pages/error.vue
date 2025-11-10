<script lang="ts" setup>
const route = useRoute();
const error = route.query.error || "An unknown error occuered";
</script>

<template>
  <div class="card container mx-auto min-h-64 bg-base-300 flex justify-center items-center gap-4 mt-4 text-center px-12">
    <div role="alert" class="alert alert-error min-w-1/2">
      <span>Error: {{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary">
      Home
      <Icon name="tabler:arrow-back" size="32" />
    </NuxtLink>
  </div>
</template>
