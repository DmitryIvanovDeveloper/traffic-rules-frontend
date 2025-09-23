<script setup lang="ts">
import GoBackButton from '@/ui/Buttons/GoBackButton.vue';
import Account from '../account/presentation/view/Account.vue';

export interface IPageProps {
    title: string;
    showAccount?: boolean;
}

const { title } = defineProps<IPageProps>();
</script>

<template>
    <div class="flex flex-col w-full justify-start gap-[16px] sm:grid-rows-[24px_auto]">
        <GoBackButton />
        <div class="flex flex-col sm:gap-[24px] justify-center">
            <div class="flex flex-col sm:flex-row sm:items-center justify-left sm:justify-between gap-[16px]">
                <span
                    class="text-[24px] font-rubik-700 sm:text-[45px] text-standard block text-left sm:leading-none max-w-[648px]"
                >
                    {{ title }}
                </span>
                <div class="w-full sm:w-fit">
                    <slot name="buttons" />
                </div>
            </div>

            <Account v-if="showAccount" />

            <slot />
        </div>
    </div>
</template>
