<script setup lang="ts">
export interface ContentItem {
    id: string;
    title: string;
    path: string;
}

export interface INavigationContentProps {
    title: string;
    content: Array<ContentItem>;
    handlePress: (id: string) => void;
}

const { title, content, handlePress } = defineProps<INavigationContentProps>();
</script>

<template>
    <div class="grid sm:grid-cols-[auto] grid-flow-col">
        <slot />

        <div class="hidden justify-center h-[175px] sm:grid grid-flow-row w-[312px] ml-[20px]">
            <span class="font-rubik-500 text-[24px] text-label text-left">{{ title }}</span>

            <div class="grid grid-flow-row gap-[20px] mt-[40px]">
                <div v-for="item in content" class="grid justify-start">
                    <router-link class="text-[#01AEEA] hover:text-[#01AEEA] text-left" :onclick="() => handlePress(item.id)" :to="item.path">
                        <span class="font-roboto-500 text-[18px] text-primary">{{ item.title }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
