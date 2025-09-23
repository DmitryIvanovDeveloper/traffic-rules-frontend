<script setup lang="ts">
export interface ILogoProps {}
</script>

<template>
    <div
        class="grid flex-col w-full bg-background  px-[20px] pb-[20px] pt-[15px]  rounded-[20px] shadow-lg "
    >
        <slot />
    </div>
</template>
