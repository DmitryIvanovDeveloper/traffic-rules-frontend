<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
import FieldWrapper from './FieldWrapper.vue';
import { ref, watch } from 'vue';

export interface IUniversalInput {
    error?: string;
    label?: string;
    placeholder: string;
    value?: string;
    isRequired?: boolean;
    disabled?: boolean;
    suggestions: any[];
    type?: 'number' | 'password';
    onChange: (value: string) => void;
}

const {
    value,
    error: errorMessage,
    label,
    onChange,
    isRequired,
    disabled,
    suggestions,
} = defineProps<IUniversalInput>();

const inputValue = ref(value ?? '');

// Обновление локального значения при изменении пропса value
watch(
  () => value,
  (newVal) => {
    inputValue.value = newVal ?? '';
  }
);
</script>

<template>
    <FieldWrapper :label="label" :isRequired="isRequired" :error="error">
        <AutoComplete
            :label="label"
            v-model="inputValue"
            :suggestions="suggestions"
            @complete="({ query }) => onChange(query)"
            :placeholder="placeholder"
            input-class="w-full !py-[14px] !px-[20px] !bg-content_background !placeholder-text_primary h-[52px] "
            @update:modelValue="onChange"
        />
    </FieldWrapper>
</template>

<style>
.p-select-label.p-placeholder {
    color: var(--p-inputtext-text-placeholder);
    text-align: left;
    padding: 14px 20px;
}
</style>
