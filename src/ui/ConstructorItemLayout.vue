<script setup lang="ts">
import CorrectionsLabel from './CorrectionsLabel.vue';

export interface IConstructorItemLayoutProps {
	label: string
    correction?: boolean
}

const { label } = defineProps<IConstructorItemLayoutProps>();
</script>

<template>
    <div class="flex flex-col gap-[8px]">
        <CorrectionsLabel :label="label" />
        <slot />
    </div>

</template>
