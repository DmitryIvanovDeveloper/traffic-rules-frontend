<script setup lang="ts">
import NavigationItem, { INavigationItemProps } from './NavigationItem.vue';

export interface INavigationListProps {
    content: Array<INavigationItemProps>
    handlePress: (id: string) => void;
}

const { content, handlePress } = defineProps<INavigationListProps>();

</script>

<template>
    <div  class="flex flex-col gap-[8px] sm:gap-[16px]">
        <div v-for="item in content">
            <NavigationItem
                :id="item.id"
                :title="item.title"
                :info="item.info"
                :onclick="() => handlePress(item.id)"
                :type="item.type"
            />
        </div>
    </div>
       
</template>
