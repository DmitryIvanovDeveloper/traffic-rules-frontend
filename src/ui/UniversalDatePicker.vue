<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import Calendar from 'primevue/calendar';
import FieldWrapper from './FieldWrapper.vue';

export interface IUniversalIDatePickerProps {
    type: 'date' | 'datetime' | 'daterange';
    error?: string;
    label?: string;
    placeholder?: string;
    value?: any;
    isRequired?: boolean;
    onChange: (value: any) => void;
}

const { error, label, onChange, isRequired, type = 'date', value, placeholder } = defineProps<IUniversalIDatePickerProps>();

const selectedDate = ref(value ?? null);

watch(
  () => value,
  (newVal) => {
    selectedDate.value = newVal;
  }
);

watch(
  () => selectedDate.value,
  (newVal) => {
    onChange?.(newVal);
  }
);
</script>

<template>
  <FieldWrapper :label="label" :isRequired="isRequired" :error="error">
    <Calendar
      v-if="type === 'date'"
      v-model="selectedDate"
      dateFormat="dd.mm.yy"
      :placeholder="placeholder"
      class="w-full h-[52px]"
      inputClass="w-full h-[52px] px-[20px] py-[14px] text-sm"
      iconDisplay="input"
    />

    <Calendar
      v-if="type === 'datetime'"
      v-model="selectedDate"
      :showTime="true"
      showIcon
      dateFormat="dd.mm.yy"
      :placeholder="placeholder"
      class="w-full h-[52px]"
      inputClass="w-full h-[52px] px-[20px] py-[14px] text-sm"
      iconDisplay="input"
    />

    <Calendar
      v-if="type === 'daterange'"
      v-model="selectedDate"
      selectionMode="range"
      dateFormat="dd.mm.yy"
      :placeholder="placeholder"
      class="w-full h-[52px]"
      inputClass="w-full h-[52px] px-[20px] py-[14px] text-sm"
      iconDisplay="input"
    />
  </FieldWrapper>
</template>

<style scoped>
/* При необходимости можно добавить кастомные стили */
</style>
