<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';
import { computed } from 'vue';
import FieldWrapper from './FieldWrapper.vue';
import { InputNumber } from 'primevue';

export interface IUniversalInput {
    error?: string;
    label?: string;
    placeholder?: string;
    value?: string | number;
    defaultValue?: string;
    isRequired?: boolean;
    disabled?: boolean;
    type?: 'number' | 'password' | 'phone' | 'text' | 'email' | 'float';
    bg?: 'primary' | 'secondary';
    errorlink?: {
        title: string;
        path: string;
    };
    readonly?: boolean;
    onChange: (value: string | number) => void;
}

const {
    value,
    defaultValue,
    error,
    label,
    onChange,
    isRequired,
    disabled,
    type = 'text',
    bg,
    errorlink,
    placeholder,
    readonly,
} = defineProps<IUniversalInput>();

const modelValue = computed({
    get: () => value ?? defaultValue ?? null,
    set: (newValue: string) => onChange(newValue),
});

const inputStyle = computed(() => ({
    backgroundColor: 'white',
}));

</script>

<template>
    <FieldWrapper :label="label" :isRequired="isRequired" :error="error" :errorlink="errorlink">
        <InputMask
            :readonly="readonly"
            v-if="type === 'phone'"
            v-model="modelValue as string"
            mask="+7 (999) 999-99-99"
            class="!px-[20px] !py-[14px] !placeholder-text_primary !h-[40px]"
            :style="inputStyle"
            :placeholder="placeholder ?? '+7 (__) ___-__-__'"
            :class="[{'!border-text_danger': error}, {'!border-border_color': !error }]"
        />

        <Password
            :readonly="readonly"
            toggleMask
            v-if="type === 'password'"

            :input-class="['w-full !py-[14px] !px-[20px] !placeholder-text_primary h-[40px]', {'!border-text_danger': error}, {'!border-border_color': !error }]"
            :type="type"
            :disabled="disabled"
            :feedback="false"
            :placeholder="placeholder  ?? 'Введите пароль...'"
            :modelValue="(modelValue as string)"
            @update:modelValue="(value) => onChange(value as string)"
            :inputStyle="inputStyle"
        />

        <InputText
            v-if="type === 'text'"
            :readonly="readonly"
            :type="type"
            class="!text-label !py-[14px] !px-[20px] h-[40px] !border-border_color !justify-center !items-center !text-left"
            :disabled="disabled"
            :placeholder="placeholder"
            v-model="(modelValue as string)"
            :style="inputStyle"
            :class="[{'!border-text_danger': error}, {'!border-border_color': !error }]"
        />
        <InputNumber
            v-if="type === 'float'"
            :type="type"
            class="w-full"
            input-class="!px-[20px] h-[40px]"
            :disabled="disabled"
            :placeholder="placeholder"
            v-model="(modelValue as number)"
            :style="inputStyle"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            @input="(event) => onChange(event.value as number)"
            mode="decimal"
            :class="[{'!border-text_danger': error}, {'!border-border_color': !error }]"
        />

        <InputNumber
            v-if="type === 'number'"
            :type="type"
            class="w-full"
            input-class="!px-[20px] h-[40px]"
            :disabled="disabled"
            :placeholder="placeholder"
            v-model="(modelValue as number)"
            :style="inputStyle"
            :useGrouping="false"
            @input="(event) => onChange(event.value as number)"
        />

        <InputText
            v-if="type === 'email'"
            :type="type"
            class="!px-[20px] !py-[14px]  h-[40px] !placeholder-text_primary"
            :disabled="disabled"
            :placeholder="placeholder ?? 'Введите почту...'"
            v-model="(modelValue as string)"
            :style="inputStyle"
        />
    </FieldWrapper>
</template>

<style scoped></style>
