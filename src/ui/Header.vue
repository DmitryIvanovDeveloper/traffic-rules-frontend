<script setup lang="ts">
</script>

<template>
    <div class="flex w-full h-[70px]">
        <div class="flex items-center w-full p-[15px] w-70 bg-blue-50 flex justify-between border-r border-gray-200">
            <slot name="title"/>
            <div class="grid grid-flow-col gap-[15px]">
                <slot name="buttons"/>
            </div>
        </div>
    </div>
</template>
