<script setup lang="ts">
import RequiredPointer from './RequiredPointer.vue';

</script>

<template>
    <div class="flex">
        <RequiredPointer/>
        <span class="w-[256px] flex font-roboto-400 text-[14px] text-standard text-left sm:w-full">
            — Звездочкой отмечены поля, обязательные для заполнения
        </span>
    </div>
</template>