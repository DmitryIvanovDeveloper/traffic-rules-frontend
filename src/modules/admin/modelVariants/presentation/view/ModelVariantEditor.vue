<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import ModelVariantsController from '../controller/model-variants.controller';
import ModelVariantsPresenter from '../presenter/model-variants.presenter';
import ConstructorItemLayout from '@/ui/ConstructorItemLayout.vue';
import UniversalInput from '@/ui/UniversalInput.vue';
import ToggleSwitch from "primevue/toggleswitch";

const controller = container.get<ModelVariantsController>(TYPES.ModelVariantsController);
const presenter = container.get<ModelVariantsPresenter>(TYPES.ModelVariantsPresenter);

const variantName = ref<string>('');
const attributes = ref<Array<{ key: string; value: string | number }>>([]);
const states = ref<Array<{ type: number; image: string | null; price: number }>>([]);
const isPublished = ref<boolean>(false);

// Инициализация данных варианта
const initializeVariantData = (variant: any) => {
    if (variant) {
        console.log('=== ИНИЦИАЛИЗАЦИЯ ВАРИАНТА ===');
        console.log('Вариант:', variant);
        
        variantName.value = variant.name;
        attributes.value = [...variant.attributes];
        states.value = [...variant.states];
        isPublished.value = variant.isPublished;
        
        console.log('Инициализированные states:', states.value);
    }
};

// Отслеживание изменений выбранного варианта
watch(
    () => presenter.selectedModelVariant.value,
    (newVariant) => {
        console.log('=== ИЗМЕНЕНИЕ ВАРИАНТА В PRESENTER ===');
        console.log('Новый вариант:', newVariant);
        if (newVariant) {
            initializeVariantData(newVariant);
        }
    },
    { immediate: true, deep: true }
);

const updateVariantName = (value: string | number) => {
    variantName.value = String(value);
};

const addAttribute = () => {
    attributes.value.push({ key: '', value: '' });
};

const removeAttribute = (index: number) => {
    if (attributes.value.length > 0) {
        attributes.value.splice(index, 1);
    }
};

const addState = () => {
    states.value.push({ type: 0, image: null, price: 0 });
    console.log('Добавлено состояние. Всего:', states.value.length);
};

const removeState = (index: number) => {
    if (states.value.length > 1) {
        states.value.splice(index, 1);
        console.log('Удалено состояние. Всего:', states.value.length);
    }
};

const handleFileUpload = (event: Event, stateIndex: number) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5MB');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target?.result as string;
        if (states.value[stateIndex]) {
            states.value[stateIndex].image = result;
            console.log('Изображение загружено для состояния', stateIndex);
        }
    };
    reader.readAsDataURL(file);
};

const removeImage = (stateIndex: number) => {
    if (states.value[stateIndex]) {
        states.value[stateIndex].image = null;
        console.log('Изображение удалено для состояния', stateIndex);
    }
};

const getDamageTypeName = (type: number): string => {
    const types = ['🟢 Целая модель', '🟡 Поцарапанная модель', '🟠 Ломаная модель', '🔴 Разрушенная модель'];
    return types[type] || 'Неизвестный тип';
};

const saveVariant = async (): Promise<void> => {
    const variant = presenter.selectedModelVariant.value;
    if (!variant) {
        console.error('Вариант не найден');
        return;
    }

    console.log('=== СОХРАНЕНИЕ ВАРИАНТА ===');
    console.log('ID варианта:', variant.id);
    console.log('CustomModel ID:', variant.customModelId);
    console.log('Название:', variantName.value);
    console.log('Атрибуты:', attributes.value);
    console.log('Состояния:', states.value);
    console.log('Опубликован:', isPublished.value);

    try {
        const result = await controller.updateModelVariant(
            variant.id,
            variant.customModelId,
            variantName.value,
            attributes.value,
            states.value,
            isPublished.value
        );
        if (result.isSuccess) {
            console.log('Вариант успешно обновлен');
        } else {
            console.error('Ошибка при обновлении варианта:', result.errors);
        }
    } catch (error) {
        console.error('Ошибка при сохранении варианта:', error);
    }
};

const canSave = computed(() => {
    return variantName.value.trim() !== '' && 
           attributes.value.length > 0 && 
           attributes.value.every(attr => attr.key !== '' && attr.value !== '') &&
           states.value.length > 0 &&
           states.value.every(state => state.price >= 0);
});
</script>

<template>
    <div v-if="presenter.selectedModelVariant.value" class="flex flex-col gap-[20px]">
        <!-- Название варианта -->
        <ConstructorItemLayout label="Название варианта">
            <UniversalInput
                :value="variantName"
                :onChange="updateVariantName"
                placeholder="Введите название варианта"
                class="w-full"
            />
        </ConstructorItemLayout>

        <!-- Публикация -->
        <div class="flex justify-between p-[10px] bg-[#EFF6F8] rounded-lg">
            <span class="text-gray-700 font-medium">Опубликовать вариант</span>
            <ToggleSwitch 
                name="published" 
                :modelValue="isPublished"
                @update:modelValue="(value) => isPublished = value" 
            />
        </div>

        <!-- Атрибуты -->
        <ConstructorItemLayout label="Атрибуты варианта">
            <div class="space-y-4">
                <div 
                    v-for="(attr, attrIndex) in attributes" 
                    :key="attrIndex"
                    class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white"
                >
                    <UniversalInput
                        :value="attr.key"
                        :onChange="(value) => attr.key = value as string"
                        placeholder="Название атрибута"
                        class="flex-1"
                    />
                    <span class="text-gray-400">-</span>
                    <UniversalInput
                        :value="attr.value"
                        :onChange="(value) => attr.value = value as string"
                        placeholder="Значение атрибута"
                        class="flex-1"
                    />
                    <button 
                        @click="removeAttribute(attrIndex)"
                        class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                    >
                        ✕
                    </button>
                </div>
                
                <button 
                    @click="addAttribute"
                    class="w-full py-3 border-2 border-dashed border-orange-300 text-orange-500 hover:border-orange-400 hover:text-orange-600 rounded-lg font-medium transition-colors"
                >
                    + Добавить атрибут
                </button>
            </div>
        </ConstructorItemLayout>

        <!-- Состояния -->
        <ConstructorItemLayout label="Состояния варианта">
            <div class="space-y-4">
                <div 
                    v-for="(state, stateIndex) in states" 
                    :key="stateIndex"
                    class="border border-gray-200 rounded-lg p-4 bg-white"
                >
                    <div class="flex justify-between items-start mb-4">
                        <h5 class="text-lg font-semibold text-gray-800">Состояние {{ stateIndex + 1 }}</h5>
                        <button 
                            @click="removeState(stateIndex)"
                            class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                            :disabled="states.length <= 1"
                            title="Удалить состояние"
                        >
                            ✕
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Тип повреждения</label>
                                <select 
                                    v-model.number="state.type"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option :value="0">🟢 Целая модель</option>
                                    <option :value="1">🟡 Поцарапанная модель</option>
                                    <option :value="2">🟠 Ломаная модель</option>
                                    <option :value="3">🔴 Разрушенная модель</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Цена ($)</label>
                                <UniversalInput
                                    :value="state.price"
                                    :onChange="(value) => state.price = Number(value)"
                                    placeholder="Введите цену ($)"
                                    type="number"
                                    class="w-full"
                                />
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Изображение</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    @change="(e) => handleFileUpload(e, stateIndex)"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div v-if="state.image" class="mt-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Предпросмотр:</label>
                                <div class="relative inline-block">
                                    <img 
                                        :src="state.image" 
                                        :alt="getDamageTypeName(state.type)"
                                        class="w-32 h-32 object-cover rounded-lg border-2 border-white shadow-md"
                                    />
                                    <button
                                        type="button"
                                        @click="removeImage(stateIndex)"
                                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button 
                    class="w-full py-3 border-2 border-dashed border-gray-300 text-gray-400 rounded-lg font-medium cursor-not-allowed opacity-50"
                    disabled
                    title="States можно добавить только при создании варианта"
                >
                    + Добавить состояние (недоступно)
                </button>
            </div>
        </ConstructorItemLayout>

        <!-- Кнопка сохранения -->
        <div class="flex justify-end pt-6 border-t border-gray-200">
            <button
                @click="saveVariant"
                :disabled="!canSave || controller.updating.value"
                class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
                <span v-if="controller.updating.value">Сохранение...</span>
                <span v-else>Сохранить изменения</span>
            </button>
        </div>
    </div>
    
    <div v-else class="flex items-center justify-center h-64">
        <p class="text-gray-500">Выберите вариант для редактирования</p>
    </div>
</template>

