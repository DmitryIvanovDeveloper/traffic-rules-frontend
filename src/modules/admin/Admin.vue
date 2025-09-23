<script setup lang="ts">
import Sidebar from './sidebar/Sidebar.vue'
</script>

<template>
    <div class="grid w-full h-screen">
        <div class="flex justify-left ">
            <Sidebar />
            <router-view />
        </div>
    </div>
</template>
