<script setup lang="ts">
import { RouterPaths } from '@/app/router/router-paths';
import { useRouter } from 'vue-router';

const route = useRouter();

export interface IGoBackButtonProps {
    title?: string;
}

const { title } = defineProps<IGoBackButtonProps>();
</script>

<template>
    <div class="flex w-full">
        <el-page-header
            :title="title ?? `Вернутся на главную`"
            :onclick="() => route.push(RouterPaths.personalAccountStatistic)"
        ></el-page-header>
    </div>
</template>

<style scoped>
.div {
    width: 100%;
}

.el-page-header {
    font-family: Roboto-400;
    font-size: 16px;
    line-height: 24px;
    color: #253036;
    height: 24px;
}
</style>
