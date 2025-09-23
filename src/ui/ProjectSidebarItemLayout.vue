<script setup lang="ts">
import { FolderIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { Button } from 'primevue';


export interface IProjectSidbarItemLayout {
    title: string,
    onAdd: () => void;
    creating: boolean;
}

const { title, onAdd, creating } = defineProps<IProjectSidbarItemLayout>();
</script>
<template>
<div class="flex items-center justify-between mb-2">
    <div class="flex items-center gap-[15px]">
        <FolderIcon class="w-[15px] h-[15px] text-[#FFF]"/>
        <span class="fonet-rubik-600 text-[13px]">{{ title }}</span>
    </div>  
    <button 
        class="cursor-pointer"
        v-if="!creating" 
        @click="onAdd"
    >
        <PlusIcon class="w-[15px] h-[15px]" />
    </button>
    <span v-else>
        <i class="pi pi-spin pi-spinner text-[15px]"></i>
    </span>


</div>
<slot />
</template>