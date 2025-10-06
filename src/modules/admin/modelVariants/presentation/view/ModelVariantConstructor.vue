<script setup lang="ts">
import { inject, ref, computed } from 'vue';
import { TYPES } from '../../types';
import ModelVariantsController from '../controller/model-variants.controller';
import { container } from '@/infrastructure/bootstrap/inversify.config';

interface Props {
    modelId: string;
}

interface Emits {
    (e: 'close'): void;
    (e: 'created'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const controller = container.get<ModelVariantsController>(TYPES.ModelVariantsController);

const variantName = ref<string>('');
const attributes = ref<Array<{ key: string; value: string | number }>>([
    { key: '', value: '' }
]);
const states = ref<Array<{ type: number; image: string | null; price: number }>>([
    { type: 1, image: null, price: 0 }
]);
const isPublished = ref<boolean>(false);

const canCreate = computed(() => {
    return variantName.value.trim() !== '' && 
           attributes.value.length > 0 && 
           attributes.value.every(attr => attr.key.trim() !== '' && attr.value !== '') &&
           states.value.length > 0 &&
           states.value.every(state => state.price >= 0);
});

const addAttribute = () => {
    if (!attributes.value) attributes.value = [];
    attributes.value.push({ key: '', value: '' });
};

const removeAttribute = (index: number) => {
    if (attributes.value && attributes.value.length > 1) {
        attributes.value.splice(index, 1);
    }
};

const addState = () => {
    if (!states.value) states.value = [];
    states.value.push({ type: 1, image: null, price: 0 });
};

const removeState = (index: number) => {
    if (states.value && states.value.length > 1) {
        states.value.splice(index, 1);
    }
};

const handleCreate = async () => {
    if (!canCreate.value) return;

    const filteredAttributes = (attributes.value || []).filter(attr => 
        attr.key.trim() !== '' && attr.value !== ''
    );

    const filteredStates = (states.value || []).filter(state => 
        state.price >= 0
    );

    const result = await controller.createModelVariant(
        props.modelId,
        variantName.value.trim(),
        filteredAttributes,
        filteredStates,
        isPublished.value
    );

    if (result.isSuccess) {
        emit('created');
    }
};

const handleClose = () => {
    emit('close');
};

const getDamageTypeName = (type: number): string => {
    const types = ['', 'Целая модель', 'Поцарапанная модель', 'Ломаная модель', 'Разрушенная модель'];
    return types[type] || 'Неизвестный тип';
};

const handleFileUpload = (event: Event, stateIndex: number) => {
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
        if (states.value[stateIndex]) {
            states.value[stateIndex].image = result; // Сохраняем как base64
        }
    };
    reader.readAsDataURL(file);
};

const removeImage = (stateIndex: number) => {
    if (states.value[stateIndex]) {
        states.value[stateIndex].image = null;
    }
};

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
};
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: transparent !important;">
        <div class="rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" style="background-color: white !important;">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold" style="color: #1f2937 !important;">Создать вариант модели</h3>
                    <button @click="handleClose" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleCreate" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #374151 !important;">
                            Название варианта
                        </label>
                        <input
                            v-model="variantName"
                            type="text"
                            class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                            style="background-color: white !important; border: 2px solid #d1d5db !important; color: #1f2937 !important;"
                            placeholder="Введите название варианта"
                            required
                        />
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <label class="block text-sm font-medium" style="color: #374151 !important;">
                                Атрибуты варианта
                            </label>
                            <button
                                type="button"
                                @click="addAttribute"
                                class="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Добавить атрибут</span>
                            </button>
                        </div>

                        <div v-for="(attr, attrIndex) in attributes" :key="attrIndex" class="mb-4 p-4 rounded-lg shadow-sm" style="background-color: white !important; border: 2px solid #d1d5db !important;">
                            <div class="flex justify-between items-center mb-3">
                                <input
                                    v-model="attr.key"
                                    type="text"
                                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                    placeholder="Название атрибута"
                                    required
                                />
                                <input
                                    v-model="attr.value"
                                    type="text"
                                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                    placeholder="Значение атрибута"
                                    required
                                />
                                <button
                                    v-if="attributes.length > 1"
                                    type="button"
                                    @click="removeAttribute(attrIndex)"
                                    class="text-red-500 hover:text-red-700"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <label class="block text-sm font-medium" style="color: #374151 !important;">
                                Состояния варианта
                            </label>
                            <button
                                type="button"
                                @click="addState"
                                class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Добавить состояние</span>
                            </button>
                        </div>

                        <div v-for="(state, stateIndex) in states" :key="stateIndex" class="mb-6 p-6 rounded-lg shadow-lg" style="background-color: white !important; border: 3px solid #d1d5db !important;">
                            <div class="flex justify-between items-start mb-4">
                                <h5 class="text-lg font-semibold" style="color: #1f2937 !important;">Состояние {{ stateIndex + 1 }}</h5>
                                <button
                                    v-if="states.length > 1"
                                    type="button"
                                    @click="removeState(stateIndex)"
                                    class="flex items-center space-x-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-colors duration-200"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    <span class="text-sm">Удалить</span>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-2" style="color: #374151 !important;">
                                            <span class="flex items-center space-x-2">
                                                <span>Тип повреждения</span>
                                                <span class="text-xs" style="color: #6b7280 !important;">(обязательно)</span>
                                            </span>
                                        </label>
                                        <select
                                            v-model.number="state.type"
                                            class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                            style="background-color: white !important; border: 2px solid #d1d5db !important; color: #1f2937 !important;"
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
                                            <span class="flex items-center space-x-2">
                                                <span>Цена ($)</span>
                                                <span class="text-xs text-gray-500">(обязательно)</span>
                                            </span>
                                        </label>
                                        <input
                                            v-model.number="state.price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                            style="background-color: white !important; border: 2px solid #d1d5db !important; color: #1f2937 !important;"
                                            placeholder="Введите цену"
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-2" style="color: #374151 !important;">
                                            Изображение модели
                                        </label>
                                        <div class="space-y-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                @change="(e) => handleFileUpload(e, stateIndex)"
                                                class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                                style="background-color: white !important; border: 2px solid #d1d5db !important; color: #1f2937 !important;"
                                            />
                                            <div class="text-xs" style="color: #6b7280 !important;">
                                                Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="state.image" class="mt-4">
                                        <label class="block text-sm font-medium mb-2" style="color: #374151 !important;">Предварительный просмотр:</label>
                                        <div class="relative inline-block">
                                            <img 
                                                :src="state.image" 
                                                :alt="`Модель ${getDamageTypeName(state.type)}`"
                                                class="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-lg"
                                                @error="handleImageError"
                                            />
                                            <button
                                                type="button"
                                                @click="removeImage(stateIndex)"
                                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 shadow-lg"
                                                title="Удалить изображение"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input
                            v-model="isPublished"
                            type="checkbox"
                            id="isPublished"
                            class="mr-2"
                        />
                        <label for="isPublished" class="text-sm text-gray-700">
                            Опубликовать вариант
                        </label>
                    </div>

                    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            @click="handleClose"
                            class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            :disabled="!canCreate || controller.creating.value"
                            class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                        >
                            <span v-if="controller.creating.value" class="flex items-center space-x-2">
                                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Создание...</span>
                            </span>
                            <span v-else>Создать вариант</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
