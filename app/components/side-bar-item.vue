<script lang="ts" setup>
const props = defineProps<{
  text: string;
  href: string;
  iconName: string;
  textVisible: boolean;
}>();
</script>

<template>
  <div :class="{ tooltip: !props.textVisible }" class=" tooltip-right" :data-tip="props.text">
    <NuxtLink :to="props.href" class="flex items-center gap-2 p-2 hover:bg-base-100 hover:cursor-pointer">
      <Icon :name="props.iconName" size="24" />
      <span v-if="props.textVisible">{{ props.text }}</span>
    </NuxtLink>
  </div>
</template>
