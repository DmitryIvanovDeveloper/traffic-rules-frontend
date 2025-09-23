<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import UniversalRoundedButton from '@/ui/Buttons/UniversalRoundedButton.vue';
import Close from 'vue-material-design-icons/Close.vue';
import Dialog from 'primevue/dialog';
import { HTMLContentProps } from './HTMLContent.vue';

export interface IPopupProps {
    title: string;
    info?: string | HTMLContentProps;
    close: () => void;
}

const { title, info, close } = defineProps<IPopupProps>();

const isAdaptive = ref<boolean>(false);

const setisAdaptive = () => {
    isAdaptive.value = window.innerWidth <= 900;
};

onMounted(() => {
    setisAdaptive();
    window.addEventListener('resize', setisAdaptive);
});

onUnmounted(() => {
    window.removeEventListener('resize', setisAdaptive);
});
</script>

<template>
    <Dialog :visible="true" class="grid w-full sm:w-[600px] sm:p-[48px]" modal :closable="false">
        <template #header>
            <div class="flex justify-between items-start w-full">
                <span class="header font-rubik-700 text-[24px] sm:text-[32px] text-text_secondary">
                    {{ title }}
                </span>
                <button @click="close" class="p-2 hover:bg-gray-100 rounded-full transition">
                    <Close class="w-[24px] h-[24px] text-gray-500" />
                </button>
            </div>
        </template>
        
        <span class="text-[16px] text-text_secondary font-roboto-400">{{ info }}</span>

        <slot />

        <template #footer >
            <slot name="footer"/>
        </template>
    </Dialog>
</template>
