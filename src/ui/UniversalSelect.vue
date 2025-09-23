<script setup lang="ts">
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import FieldWrapper from './FieldWrapper.vue';
import { defineProps, onMounted, ref, watch } from 'vue';

export interface IOption {
    id?: string;
    value: any;
}

export interface IUniversalSelectProps {
    error?: string;
    label?: string;
    placeholder?: string;
    value?: any;
    options?: Array<IOption>;
    defaultValue?: any;
    isRequired?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    type?: 'single' | 'multiple';
    onChange: (value: any) => void;
}

const { error, label, onChange, isRequired, isLoading, placeholder, options = [], defaultValue, type = 'single', value } = defineProps<IUniversalSelectProps>()

const selectedValue = ref<Array<IOption> | IOption>();

onMounted(() => {
    if (!defaultValue) {
        return;
    }
    
    selectedValue.value = defaultValue;
    onChange?.(defaultValue);
});

watch(() => value, (newVal) => {
    if (!newVal) {
       return;
    }
    selectedValue.value = newVal;
}, { immediate: true });

watch(() => selectedValue.value, (newVal) => {
    if (!newVal) {
        return;
    }
    onChange(newVal);
});

</script>

<template>
    <FieldWrapper :label="label" :isRequired="isRequired" :error="error">
        <MultiSelect
            v-if="type === 'multiple'"
            :loading="isLoading"
            v-model="selectedValue"
            :options="options"
            optionLabel="value"
            :placeholder="placeholder"
            :disabled="disabled"
            input-class="!placeholder-text_primary"
            class="w-full text-label h-[52px]"
        />
    
        <Select
            v-if="type === 'single'"
            :loading="isLoading"
            v-model="selectedValue"
            :options="options"
            optionLabel="value"
            :placeholder="placeholder"
            :disabled="disabled"
            input-class="!placeholder-text_primary"
            class="flex w-full text-label h-[52px] !justify-center !items-center !text-left"
        />
    </FieldWrapper>
</template>

<style>
.p-select-label.p-placeholder{
    color: var(--p-inputtext-text-placeholder);
}
</style>
