<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

export interface IUniversalPaginationProps {
    total: number;
    onChange: (itemPerPage: number, currentPage: number) => void
}

const { total, onChange} = defineProps<IUniversalPaginationProps>();

const currentPage = ref(1);
const itemsPerPage = ref(5);


const calculateItemsPerPage = () => {
        const availableHeight = window.innerHeight - 200; // Высота экрана минус фиксированные области
        const itemHeight = 100; // Примерная высота одного элемента

        const num = Math.floor(availableHeight / itemHeight);
        itemsPerPage.value = num
};

onMounted(() => {
    onChangePage(1);
    window.addEventListener('resize', calculateItemsPerPage);

});

onUnmounted(() => {
    window.removeEventListener('resize', calculateItemsPerPage);
});

const onChangePage = (page: number) => {
    currentPage.value = page;
    calculateItemsPerPage();
    onChange(itemsPerPage.value, page)
}
</script>

<template>
    <el-pagination
        size="large"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="itemsPerPage"
        :current-page="currentPage"
        @current-change="onChangePage"
        class="mt-4"
/>
</template>

<style scoped>

</style>