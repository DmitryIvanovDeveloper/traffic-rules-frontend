<script setup lang="ts">
export interface IMemberTableHeaderProps {
    title: string
}

const { title } = defineProps<IMemberTableHeaderProps>();

</script>

<template>
    <div class="font-roboto-500 text-[14px] text-[#424242] p-[5px] w-full bg-[#D7E4E9] rounded-[5px] block text-left">{{title}}</div>
</template>