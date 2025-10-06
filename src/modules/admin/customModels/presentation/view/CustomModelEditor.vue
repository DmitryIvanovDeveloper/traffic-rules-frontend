<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { TYPES } from '../../types';
import CustomModelsController from '../controller/custom-models.controller';
import CustomModelsPresenter from '../presenter/custom-models.presenter';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import ConstructorItemLayout from '@/ui/ConstructorItemLayout.vue';
import UniversalInput from '@/ui/UniversalInput.vue';
import ToggleSwitch from "primevue/toggleswitch";

const controller = container.get<CustomModelsController>(TYPES.CustomModelsController);
const presenter = container.get<CustomModelsPresenter>(TYPES.CustomModelsPresenter);

const modelName = ref<string>('');
const isPublished = ref<boolean>(false);

// Функция для инициализации данных модели
const initializeModelData = (model: any) => {
    if (model) {
        console.log('=== ИНИЦИАЛИЗАЦИЯ МОДЕЛИ ===');
        console.log('Модель:', model);
        
        modelName.value = model.name;
        isPublished.value = model.isPublished;
    } else {
        console.log('Модель не найдена при инициализации');
    }
};

// Инициализация данных модели
onMounted(() => {
    initializeModelData(presenter.customModelViewModel.value);
});

// Отслеживание изменений в presenter
watch(
    () => presenter.customModelViewModel.value,
    (newModel) => {
        console.log('=== ИЗМЕНЕНИЕ МОДЕЛИ В PRESENTER ===');
        console.log('Новая модель:', newModel);
        initializeModelData(newModel);
    },
    { deep: true }
);

const saveModel = async (): Promise<void> => {
    const model = presenter.customModelViewModel.value;
    if (!model) {
        console.error('Модель не найдена');
        return;
    }

    console.log('=== СОХРАНЕНИЕ CUSTOM MODEL ===');
    console.log('ID модели:', model.id);
    console.log('Название:', modelName.value);
    console.log('Опубликовано:', isPublished.value);

    try {
        // CustomModel API: только name и isPublished
        // Attributes и States управляются через ModelVariants
        const result = await controller.updateCustomModelWithData(
            model.id,
            modelName.value,
            [], // Attributes задаются в ModelVariants
            [], // States задаются в ModelVariants
            model.projectId,
            isPublished.value
        );

        if (result.isSuccess) {
            console.log('Модель успешно обновлена');
        } else {
            console.error('Ошибка при обновлении модели:', result.errors);
        }
    } catch (error) {
        console.error('Ошибка при сохранении:', error);
    }
};

const canSave = computed(() => {
    return modelName.value.trim() !== '';
});
</script>

<template>
    <div v-if="presenter.customModelViewModel.value" class="flex flex-col gap-[20px]">

        <!-- Название модели -->
        <ConstructorItemLayout label="Название модели">
            <UniversalInput
                :value="modelName"
                :onChange="(value) => modelName = value as string"
                placeholder="Введите название модели"
                class="w-full"
            />
        </ConstructorItemLayout>

        <!-- Публикация -->
        <div class="flex justify-between p-[10px] bg-[#EFF6F8] rounded-lg">
            <span class="text-gray-700 font-medium">Опубликовать модель</span>
            <ToggleSwitch 
                name="published" 
                :modelValue="isPublished"
                @update:modelValue="(value) => isPublished = value" 
            />
        </div>

        <!-- Информация о Variants -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-900 mb-2">💡 Варианты модели (Model Variants)</h4>
            <p class="text-sm text-blue-800">
                Базовая модель содержит только <strong>название</strong>. Для создания конкретных вариантов 
                используйте раздел <strong>"Варианты модели"</strong> в боковой панели.
            </p>
            <p class="text-sm text-blue-800 mt-2">
                <strong>В вариантах задаются:</strong>
            </p>
            <ul class="text-sm text-blue-800 mt-1 ml-4 list-disc">
                <li><strong>Атрибуты</strong> (Марка, Цвет, Скорость и т.д.)</li>
                <li><strong>States</strong> (Целая, Поцарапанная, Ломаная, Разрушенная)</li>
                <li><strong>Изображения</strong> для каждого состояния</li>
                <li><strong>Цены</strong> для каждого состояния</li>
            </ul>
        </div>

        <!-- Кнопка сохранения -->
        <div class="flex justify-end pt-6 border-t border-gray-200">
            <button
                @click="saveModel"
                :disabled="!canSave || controller.updating.value"
                class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
                <span v-if="controller.updating.value" class="flex items-center space-x-2">
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Сохранение...</span>
                </span>
                <span v-else>Сохранить изменения</span>
            </button>
        </div>
    </div>
    
    <div v-else class="flex items-center justify-center h-64">
        <p class="text-gray-500">Выберите модель для редактирования</p>
    </div>
</template>

<style scoped>
/* Дополнительные стили при необходимости */
</style>