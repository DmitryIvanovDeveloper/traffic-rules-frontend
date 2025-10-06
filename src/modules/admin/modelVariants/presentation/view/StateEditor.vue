<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">{{ isEditMode ? 'Редактировать состояние' : 'Добавить состояние' }}</h3>
                    <button @click="handleClose" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleSave" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Тип повреждения модели
                        </label>
                        <select
                            v-model.number="stateData.type"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="0">🟢 Целая модель</option>
                            <option value="1">🟡 Поцарапанная модель</option>
                            <option value="2">🟠 Ломаная модель</option>
                            <option value="3">🔴 Разрушенная модель</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Цена ($)
                        </label>
                        <input
                            v-model.number="stateData.price"
                            type="number"
                            min="0"
                            step="0.01"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Введите цену ($)"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Изображение модели
                        </label>
                        <div class="space-y-3">
                            <input
                                ref="fileInput"
                                type="file"
                                accept="image/*"
                                @change="handleFileUpload"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div class="text-xs text-gray-500">
                                Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB
                            </div>
                        </div>
                    </div>

                    <div v-if="stateData.image" class="mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Предварительный просмотр:</label>
                        <div class="relative inline-block">
                            <img 
                                :src="stateData.image" 
                                :alt="`Модель ${getDamageTypeName(stateData.type)}`"
                                class="w-32 h-32 object-cover rounded border"
                                @error="handleImageError"
                            />
                            <button
                                type="button"
                                @click="removeImage"
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                title="Удалить изображение"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            @click="handleClose"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            :disabled="!canSave"
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ isEditMode ? 'Обновить' : 'Добавить' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Props {
    variantId: string;
    state?: {
        type: number;
        image: string | null;
        price: number;
    };
    stateIndex?: number;
}

interface Emits {
    (e: 'close'): void;
    (e: 'save', state: { type: number; image: string | null; price: number }, stateIndex?: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const fileInput = ref<HTMLInputElement>();

const isEditMode = computed(() => !!props.state && props.stateIndex !== undefined);

const stateData = ref({
    type: props.state?.type || 1,
    image: props.state?.image || '',
    price: props.state?.price || 0
});

const getDamageTypeName = (type: number): string => {
    const types = ['', 'Целая модель', 'Поцарапанная модель', 'Ломаная модель', 'Разрушенная модель'];
    return types[type] || 'Неизвестный тип';
};

const canSave = computed(() => {
    return stateData.value.type >= 1 && 
           stateData.value.price >= 0 && 
           stateData.value.price !== null;
});

const handleSave = () => {
    if (!canSave.value) return;

    const state = {
        type: stateData.value.type,
        image: stateData.value.image || null,
        price: stateData.value.price
    };

    emit('save', state, props.stateIndex);
};

const handleClose = () => {
    emit('close');
};

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
};

const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;
    
    // Проверка размера файла (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5MB');
        return;
    }
    
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target?.result as string;
        stateData.value.image = result; // Сохраняем как base64
    };
    reader.readAsDataURL(file);
};

const removeImage = () => {
    stateData.value.image = '';
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

onMounted(() => {
    // Фокус на первом поле
    const firstInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    if (firstInput) {
        firstInput.focus();
    }
});
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
