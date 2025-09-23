<script setup lang="ts">
import { CSSProperties } from 'vue';
import Button from 'primevue/button';

export interface IUniversalRoundedButton {
    rounded?: boolean;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'danger' | 'additional' | 'link';
    style?: CSSProperties;
    label?: string;
    loading?: boolean;
    handlePress: () => void;
}

const { rounded, label, disabled, type = 'primary', style, loading, handlePress } = defineProps<IUniversalRoundedButton>();
</script>

<template>
    <Button
        :label="label"
        :disabled="disabled"
        :loading="loading"
        @click="handlePress"
        :class="[
            type === 'link'
                ? '!p-[0px] !m-[0px] !bg-transparent !font-roboto-400 !text-[14px] !text-label !border-none shadow-none hover:underline transition-all !duration-200 underline-offset-4'
                : 'flex h-[52px] min-w-[150px] justify-center items-center',
            {
                '!rounded-[26px]': rounded && type !== 'link',
                '!rounded-[6px]': !rounded && type !== 'link',
                'font-roboto-500 text-[16px]': rounded && type !== 'link',
                'font-roboto-700 text-[18px]': !rounded && type !== 'link',
                '!bg-[#9747FF] !border-none !border-primary !text-white': type === 'primary',
                '!bg-[#FFFFFF] !text-[#424242] border !border-[#9747FF]': type === 'secondary',
                '!bg-text_danger !border-none !text-white': type === 'danger',
                '!bg-disabled !border-none !text-white': disabled,
                '!bg-additional !text-primary': type === 'additional',
            },
        ]"
    />
</template>
