<script setup lang="ts">
export interface IAuthFooterProps {
    title: string;
    linkText: string;
    goTo: () => void;
}

const { title, linkText, goTo } = defineProps<IAuthFooterProps>();
</script>

<template>
    <div class="footer w-full items-center grid sm:flex justify-between">
        <div class="flex gap-[5px] items-center">
            <label class="font-roboto-400 text-[14px]">
                {{ title }}
            </label>

            <Button :onclick="() => goTo()">
                <RouterLink to="/" class="link flex font-roboto-400 text-[14px]">{{ linkText }}</RouterLink>
            </Button>
        </div>

        <Button>
            <RouterLink to="/" class="link font-roboto-400 text-[14px] flex">Помощь</RouterLink>
        </Button>
    </div>
</template>
