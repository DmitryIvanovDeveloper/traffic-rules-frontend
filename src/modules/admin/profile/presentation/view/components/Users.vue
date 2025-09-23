<script setup lang="ts">
import { Column, DataTable, Button, Tag } from 'primevue';

import { ref } from 'vue';

const users = ref([
    {
        name: 'Дарья Васнецова',
        email: 'Darya@Gmail.com',
        role: 'Администратор',
        lastActivity: '02.06.2025 / 15:08',
        status: 'Активный'
    },
    {
        name: 'Дарья Васнецова',
        email: 'Darya@Gmail.com',
        role: 'Администратор',
        lastActivity: '02.06.2025 / 15:08',
        status: 'Неактивный'
    },
    {
        name: 'Дарья Васнецова',
        email: 'Darya@Gmail.com',
        role: 'Администратор',
        lastActivity: '02.06.2025 / 15:08',
        status: 'Активный'
    },
    {
        name: 'Дарья Васнецова',
        email: 'Darya@Gmail.com',
        role: 'Администратор',
        lastActivity: '02.06.2025 / 15:08',
        status: 'Активный'
    }
])
</script>

<template>
  <!-- Users Card -->
  <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
      <h3 class="text-lg font-semibold text-gray-800">Пользователи компании:</h3>
      <Button 
        label="Добавить пользователя" 
        class="w-full sm:w-auto"
        style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border: none;"
      />
    </div>
    
    <!-- Desktop Table -->
    <div class="hidden lg:block">
      <DataTable :value="users" class="p-datatable-sm">
        <Column field="name" header="Имя" style="width: 15%"></Column>
        <Column field="email" header="Email" style="width: 20%"></Column>
        <Column field="role" header="Роль" style="width: 15%"></Column>
        <Column field="lastActivity" header="Последняя активность" style="width: 20%"></Column>
        <Column header="Статус" style="width: 15%">
          <template #body="slotProps">
            <Tag 
              :value="slotProps.data.status" 
              :severity="slotProps.data.status === 'Активный' ? 'success' : 'secondary'"
              class="text-xs px-3 py-1"
            />
          </template>
        </Column>
        <Column style="width: 15%">
          <template #body>
            <div class="flex gap-2">
              <Button icon="pi pi-pencil" class="p-button-text p-button-sm" />
              <Button icon="pi pi-trash" class="p-button-text p-button-sm p-button-danger" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Mobile Cards -->
    <div class="lg:hidden space-y-4">
      <div v-for="user in users" :key="user.email" class="border border-gray-200 rounded-lg p-4">
        <div class="flex justify-between items-start mb-3">
          <div>
            <div class="font-medium text-gray-900">{{ user.name }}</div>
            <div class="text-sm text-gray-600">{{ user.email }}</div>
          </div>
          <Tag 
            :value="user.status" 
            :severity="user.status === 'Активный' ? 'success' : 'secondary'"
            class="text-xs px-2 py-1"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <span class="text-gray-500">Роль:</span>
            <div class="font-medium">{{ user.role }}</div>
          </div>
          <div>
            <span class="text-gray-500">Активность:</span>
            <div class="font-medium">{{ user.lastActivity }}</div>
          </div>
        </div>
        <div class="flex gap-2">
          <Button icon="pi pi-pencil" class="p-button-text p-button-sm flex-1" label="Изменить" />
          <Button icon="pi pi-trash" class="p-button-text p-button-sm p-button-danger flex-1" label="Удалить" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-datatable .p-datatable-tbody > tr > td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.p-datatable .p-datatable-thead > tr > th {
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