<script setup lang="ts">
import ConstructorItemLayout from "@/ui/ConstructorItemLayout.vue";
import { ref } from "vue";

const props = defineProps({
    initialSelectedIcon: {
        type: Number,
        default: 0,
    },
});

const selectedIcon = ref(props.initialSelectedIcon);

const icons = ref([
    "🐤",
    "🚀",
    "⭐",
    "👑",
    "🔆",
    "⚡",
    "✈️",
    "👁️",
    "🔍",
    "👑",
    "🍎",
    "💎",
    "📢",
    "☁️",
    "💬",
    "👑",
    "👥",
]);

const selectIcon = (index: number) => {
    selectedIcon.value = index;
};
</script>

<template>
    <div class="flex flex-col w-full max-w-3xl rounded-lg overflow-hidden">
        <div class="flex">
            <!-- Left panel - Preview -->
            <div class="w-1/3">
                <div
                    class="aspect-square w-full flex items-center justify-center rounded-lg mb-4 border border-[2px] bg-[#FFF] border-[#B7C0CA]">
                    <div class="text-5xl flex items-center">
                        <span>{{ icons[selectedIcon] }}</span>
                        <span class="text-orange-500 text-xl ml-2">✨</span>
                    </div>
                </div>
<!-- 
                <div class="border-t pt-4">
                    <button class="flex items-center text-gray-500 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-upload">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>Upload icon</span>
                    </button>
                </div> -->
            </div>
            <div class="flex  flex-col w-full gap-[10px] pl-[10px]">
                <ConstructorItemLayout :label="'Иконка достижения'"></ConstructorItemLayout>

                <div class="bg-[#EFF6F8] rounded-[6px] items-center">
                    <!-- Icon grid -->
                    <div class="p-4 relative">
                        <div class="grid grid-cols-5 gap-2">
                            <div v-for="(icon, index) in icons" :key="index"
                                class="aspect-square w-[45px] h-[45px] border border-[1px] border-[#B7C0CA] text-[1px] flex items-center justify-center rounded-[6px]"
                                :class="{
                                    'border-purple-400 border-2': index === selectedIcon,
                                }" @click="selectIcon(index)">
                                <span class="text-yellow-400 text-2xl">{{ icon }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
