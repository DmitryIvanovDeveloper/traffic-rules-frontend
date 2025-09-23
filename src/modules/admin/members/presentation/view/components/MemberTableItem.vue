<script setup lang="ts">
export interface IMemberTableItemProps {
    title: string | number
}

const { title } = defineProps<IMemberTableItemProps>();

</script>

<template>
    <div class="font-roboto-500 text-[14px] text-[#7D8B91] w-full p-[5px] bg-[#FFFFFF] rounded-[5px] block text-left cursor-pointer">{{ title }}</div>
</template>