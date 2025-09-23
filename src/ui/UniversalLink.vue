<script setup lang="ts">
import HTMLContent from './HTMLContent.vue';


export interface IUniversalLinkProps {
    title: string;
    linkText: string;
    goTo: () => void;
}
const { title, linkText, goTo } = defineProps<IUniversalLinkProps>();
</script>

<template>
    <HTMLContent 
        :content="`<div class='font-roboto-400 text-[14px] text-left gap-[5px] text-text_primary'><span>${title}</span><a class='pl-[5px]'>${linkText}</a><span></div>`"
    />
</template>