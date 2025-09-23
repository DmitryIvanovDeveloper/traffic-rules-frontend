<script setup lang="ts">
import Account from '../personal/account/presentation/view/Account.vue';
import FileLink from './FileLink.vue';
import Page from '../modules/personal/ui/Page.vue';
import { ElementType, IConstructorElementViewModel, IFileViewModel } from './types/constructor';

export interface INewRequestConstructorProps {
    title: string;
    elements: Array<IConstructorElementViewModel>;
}

const { title, elements } = defineProps<INewRequestConstructorProps>();
</script>

<template>
    <Page :title="title">
        <Account />
        <div class="flex flex-col gap-[24px]" v-for="element in elements">
            <span
                v-if="element.type === ElementType.Textarea"
                class="text-[18px] font-rubik-700 sm:text-[24px] text-left text-standard"
                >{{ element.name }}</span
            >
            <span
                v-if="element.type === ElementType.Textarea"
                class="text-[16px] font-roboto-400 sm:text-[18px] text-left text-standard"
                >{{ element.value }}</span
            >

            <div class="grid gap-[8px]">
                <div
                    class="grid grid-flow-col items-center justify-start"
                    v-if="element.type ===  ElementType.File"
                    v-for="(file, index) in element.value as Array<IFileViewModel>"
                    :key="file.id"
                >
                    <FileLink :text="file.name" path="" />
                </div>
            </div>
        </div>
    </Page>
</template>
