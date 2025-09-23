<script setup lang="ts">
import { ref } from 'vue';
import { Column, DataTable, Button, Tag } from 'primevue';

const projects = ref([
    {
        name: 'Проектный гуру',
        participants: 238,
        completion: '87%',
        date: '17.08.2025'
    },
    {
        name: 'Проектный гуру',
        participants: 238,
        completion: '87%',
        date: '17.08.2025'
    },
    {
        name: 'Проектный гуру',
        participants: 238,
        completion: '87%',
        date: '17.08.2025'
    },
    {
        name: 'Проектный гуру',
        participants: 238,
        completion: '87%',
        date: '17.08.2025'
    }
])
</script>

<template>
     <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Аналитика:</h3>

        <div class="flex flex-col xl:flex-row gap-6 xl:gap-8">
            <div class="flex-1">
                <div class="hidden lg:block mb-4">
                    <DataTable :value="projects" class="p-datatable-sm">
                        <Column field="name" header="Название проекта" style="width: 30%"></Column>
                        <Column field="participants" header="Всего участников" style="width: 20%"></Column>
                        <Column field="completion" header="% Выполнения" style="width: 20%"></Column>
                        <Column field="date" header="Дата выполнения" style="width: 20%"></Column>
                        <Column style="width: 10%">
                            <template #body>
                                <Button icon="pi pi-eye" class="p-button-text p-button-sm"
                                    style="color: #8b5cf6;" />
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Button label="Расширенная аналитика" class="w-full sm:w-auto"
                    style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border: none;" />
            </div>

            <!-- Statistics Cards -->
            <div class="w-full xl:w-80">
                <div class="grid grid-cols-2 gap-3 sm:gap-4">
                    <div
                        class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-4 sm:p-6 text-center">
                        <div class="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">54</div>
                        <div class="text-xs sm:text-sm text-gray-600">Активных тестов</div>
                    </div>
                    <div
                        class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-4 sm:p-6 text-center">
                        <div class="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">16</div>
                        <div class="text-xs sm:text-sm text-gray-600">Неактивных тестов</div>
                    </div>
                    <div
                        class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-4 sm:p-6 text-center">
                        <div class="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">384</div>
                        <div class="text-xs sm:text-sm text-gray-600">Участники</div>
                    </div>
                    <div
                        class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-4 sm:p-6 text-center">
                        <div class="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">897</div>
                        <div class="text-xs sm:text-sm text-gray-600">Тестов пройдено</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  


<style scoped>
.p-datatable .p-datatable-tbody>tr>td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
}

.p-datatable .p-datatable-thead>tr>th {
    padding: 0.75rem;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
    color: #374151;
}

.p-tag.p-tag-success {
    background-color: #ddd6fe;
    color: #7c3aed;
    border: 1px solid #c4b5fd;
}

.p-tag.p-tag-secondary {
    background-color: #e5e7eb;
    color: #6b7280;
    border: 1px solid #d1d5db;
}

.p-button.p-button-outlined {
    background: transparent;
}

.p-button.p-button-text {
    background: transparent;
    border: none;
    color: #6b7280;
}

.p-button.p-button-text:hover {
    background: #f3f4f6;
}

.p-button.p-button-danger {
    color: #ef4444;
}

/* Mobile responsive improvements */
@media (max-width: 640px) {
    .p-button {
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
    }

    .p-button-sm {
        font-size: 0.75rem;
        padding: 0.375rem 0.75rem;
    }
}

/* Tablet responsive improvements */
@media (min-width: 641px) and (max-width: 1023px) {
    .grid-cols-2 {
        gap: 1rem;
    }
}
</style>