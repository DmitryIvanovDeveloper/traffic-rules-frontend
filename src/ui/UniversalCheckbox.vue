<script setup lang="ts">
import { defineProps, ref, watch, onMounted } from 'vue';
import Checkbox from 'primevue/checkbox';
import HTMLContent from './HTMLContent.vue';

export interface ICheckboxOption {
  id: string;
  required: boolean;
  label: string;
  checked: boolean;
}

export interface IUniversalCheckboxProps {
  options: ICheckboxOption;  // A single checkbox option with all necessary fields
  modelValue?: boolean;      // Model value for v-model
  type: 'single' | 'multiple'; // Whether it's a single or multiple selection
  onChange: (value: boolean) => void; // Event to notify parent component about changes
}

// Destructure props for easier usage
const { options, modelValue, type, onChange } = defineProps<IUniversalCheckboxProps>();

const model = ref<boolean>(modelValue ?? options.checked);

onMounted(() => {
  onChange(model.value);
});

// Watch for changes in modelValue and update model accordingly
watch(
  () => modelValue,
  (val) => {
    model.value = val ?? options.checked; // Ensure model is updated with modelValue
  }
);

watch(model, (val) => {
  onChange(val); // Notify parent of model changes
});
</script>

<template>
  <div class="flex items-center gap-[10px]">
    <label :for="options.id" class="flex items-center gap-[15px] cursor-pointer justify-center items-center">
      <Checkbox
        v-model="model"
        :binary="true"
        :inputId="options.id"
        class="!flex !justify-center rounded-[4px]"
      />
      <HTMLContent
        :content="options.label"
        class="font-roboto-400 text-[#424242] text-[13px] text-left"
      />
    </label>
  </div>
</template>

<style scoped>
.p-checkbox-input input {
  color: blue !important;
}
</style>
