<script lang="ts" setup>
const props = defineProps<{
  label: string;
  name: string;
  type?: string;
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="props.type === 'textarea' ? 'textarea' : 'input' "
      :disabled="props.disabled"
      :name="props.name"
      :class="{
        'input': props.type !== 'textarea',
        'textarea': props.type === 'textarea',
        'input-error': props.error,
      }"
      :type="props.type || 'text'"
    />
    <p v-if="props.error" class="text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
