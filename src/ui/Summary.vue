<script setup lang="ts">
import UniversalRoundedButton from './Buttons/UniversalRoundedButton.vue';

export interface ISummaryProps {
    title: string;
    handleShowAll?: () => void;
}

const { title, handleShowAll } = defineProps<ISummaryProps>();
</script>

<template>
    <div class="grid bg-white rounded-[20px] py-[32px] px-[24px] sm:p-[32px] gap-[24px] sm:gap-[16px]">
        <div class="grid justify-start gap-[10px] sm:grid-flow-col sm:justify-between">
            <span class="font-rubik-700 w-[240px] text-standard text-left text-[20px] sm:w-full">{{ title }}</span>

            <div class="flex">
                <UniversalRoundedButton
                v-if="!!handleShowAll"
                label="Посмотреть все"
                :handle-press="() => handleShowAll?.()"
                type="link"
            />
            </div>
        </div>

        <slot />
    </div>
</template>
