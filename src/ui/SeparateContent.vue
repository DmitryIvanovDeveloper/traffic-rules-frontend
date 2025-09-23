<script setup lang="ts">


</script>

<template>
    <div class="grid sm:grid-cols-[max-648px_auto] grid-flow-col">
        <div>
            <slot />
        </div>
        <div class="hidden grid gap-[20px] justify-center  overflow-auto sm:grid">
           <slot name="right"/>
        </div>
    </div>
</template>
