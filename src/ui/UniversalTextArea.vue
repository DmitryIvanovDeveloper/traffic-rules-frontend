<script setup lang="ts">
import { ref, watch } from 'vue';
import FieldWrapper from './FieldWrapper.vue';
import Textarea from 'primevue/textarea';

export interface IUniversalTextAreaProps {
    error?: string;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    onChange: (value: string) => void;
    limit?: number;
    modelValue?: string;
}

const props = defineProps<IUniversalTextAreaProps>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const text = ref(props.modelValue ?? '');
const currentLength = ref(text.value.length);

const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const value = props.limit ? target.value.slice(0, props.limit) : target.value;

    text.value = value;
    currentLength.value = value.length;

    props.onChange(value);
    emit('update:modelValue', value);
};

watch(
    () => props.modelValue,
    (newVal) => {
        text.value = newVal ?? '';
        currentLength.value = text.value.length;
    }
);
</script>

<template>
    <FieldWrapper :label="props.label" :isRequired="props.isRequired" :error="props.error">
        <Textarea
            v-model="text"
            @input="onInput"
            :placeholder="props.placeholder"
            class="w-full bg-white !placeholder-text_primary !py-[14px] !px-[20px]"
            :maxlength="props.limit"
            autoResize
            rows="3"
            :class="[{'!border-[#FF6666]': error}, {'!border-border_color': !error }]"
        />
        <span
            v-if="props.limit"
            class="font-roboto-400 text-[14px] block text-right text-text_secondary"
        >
            {{ `${currentLength}/${props.limit} допустимых символов` }}
        </span>
    </FieldWrapper>
</template>
