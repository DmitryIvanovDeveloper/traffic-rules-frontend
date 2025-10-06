<script setup>

import Button from 'primevue/button'
import Header from '@/ui/Header.vue'
import Users from './components/Users.vue'
import Analitics from './components/Analitics.vue'


</script>

<template>
    <div class="w-full">

        <Header>
            <template #title>
                <div class="flex">
                    <div class="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center mr-3">
                        <i class="pi pi-crown text-white text-sm"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-sm sm:text-base">Дарья Васнецова</span>
                </div>
            </template>
        </Header>

        <div class="min-h-screen bg-gray-100 p-2 sm:p-4 lg:p-6">
            <!-- Company Info Card -->
            <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                    <div class="flex flex-col items-start">
                        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                            <h2 class="text-lg sm:text-xl font-semibold text-gray-800">TechCorp Solution</h2>
                            <Button label="Редактировать информацию"
                                class="p-button-outlined p-button-sm w-full sm:w-auto"
                                style="border-color: #8b5cf6; color: #8b5cf6;" />
                        </div>
                        <div class="text-gray-600 space-y-1 text-sm sm:text-base">
                            <div>email@example.com</div>
                            <div>+7 000 00-00-00</div>
                        </div>
                    </div>

                    <!-- Premium Plan Card -->
                    <div class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-4 sm:p-6 w-full lg:w-80">
                        <div class="text-sm text-gray-600 mb-1">Тарифный план</div>
                        <div class="text-xl sm:text-2xl font-bold text-purple-600 mb-4">Премиум</div>

                        <div class="space-y-2 mb-4">
                            <div class="flex items-center text-xs sm:text-sm text-gray-700">
                                <i class="pi pi-check text-green-500 mr-2 flex-shrink-0"></i>
                                <span>1000 тестов</span>
                            </div>
                            <div class="flex items-center text-xs sm:text-sm text-gray-700">
                                <i class="pi pi-check text-green-500 mr-2 flex-shrink-0"></i>
                                <span>1000 тестов в презентационном</span>
                            </div>
                            <div class="flex items-center text-xs sm:text-sm text-gray-700">
                                <i class="pi pi-check text-green-500 mr-2 flex-shrink-0"></i>
                                <span>1000 тестов игро наблюдательный</span>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <div>
                                <div class="text-xl sm:text-2xl font-bold text-gray-800">
                                    $5000<span class="text-sm font-normal">/Мес.</span>
                                </div>
                                <div class="text-xs text-gray-500">Действует до: 17.08.2025</div>
                            </div>
                            <Button label="Изменить тариф" class="p-button-sm w-full sm:w-auto"
                                style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border: none;" />
                        </div>
                    </div>
                </div>
            </div>
            <Users />
            <Analitics />

           
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