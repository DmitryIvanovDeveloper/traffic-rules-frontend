<script setup lang="ts">
import CorrectionButtons from './CorrectionButtons.vue';

export interface ICorrectLabelProps {
	label: string
    correction?: boolean;
}

const { label } = defineProps<ICorrectLabelProps>();
</script>

<template>
    <div class="flex items-center justify-between p-2 bg-[#EFF6F8] pr-[10px] rounded-[6px]">
        <div v-if="!correction"></div>
        <CorrectionButtons v-if="correction"/>
        <span class="font-roboto-500 text-[14px] text-[#424242] block text-right">
            {{ label }}
        </span>
    </div>
</template>
