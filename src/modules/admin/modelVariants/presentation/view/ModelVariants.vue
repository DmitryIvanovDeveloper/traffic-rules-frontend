<script setup lang="ts">
import { inject, onMounted, ref, watch, computed } from 'vue';
import { TYPES } from '../../types';
import ModelVariantsController from '../controller/model-variants.controller';
import ModelVariantsPresenter from '../presenter/model-variants.presenter';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import ModelVariantConstructor from './ModelVariantConstructor.vue';
import ModelVariantEditor from './ModelVariantEditor.vue';
import StateEditor from './StateEditor.vue';
import { TYPES as CustomModelsTYPES } from '@/modules/admin/customModels/types';
import CustomModelsPresenter from '@/modules/admin/customModels/presentation/presenter/custom-models.presenter';
import ConstructorLayout from "@/ui/ConstructorLayout.vue";

const controller = container.get<ModelVariantsController>(TYPES.ModelVariantsController);
const presenter = container.get<ModelVariantsPresenter>(TYPES.ModelVariantsPresenter);
const customModelsPresenter = container.get<CustomModelsPresenter>(CustomModelsTYPES.CustomModelsPresenter);

// Типизация для вариантов
type ModelVariantViewModel = {
    id: string;
    name: string;
    customModelId: string;
    isPublished: boolean;
    attributesCount: number;
    statesCount: number;
    createdAt?: Date;
    updatedAt?: Date;
    attributes: Array<{ key: string; value: string | number }>;
    states: Array<{ type: number; image: string | null; price: number }>;
};

// Получаем modelId из выбранной CustomModel
const modelId = computed(() => customModelsPresenter.customModelViewModel.value?.id ?? '');
const showConstructor = ref<boolean>(false);
const showStateEditor = ref<boolean>(false);
const editingState = ref<{ state?: any; stateIndex?: number; variantId?: string }>({});

const handleCreateModelVariant = () => {
    showConstructor.value = true;
};

const handleCloseConstructor = () => {
    showConstructor.value = false;
};

const handleDeleteModelVariant = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот вариант?')) {
        await controller.deleteModelVariant(id);
    }
};

const handleTogglePublished = async (id: string, isPublished: boolean) => {
    controller.updatePublished(id, !isPublished);
};

const handleEditState = (variantId: string, state: any, stateIndex: number) => {
    editingState.value = { state, stateIndex, variantId };
    showStateEditor.value = true;
};

const handleDeleteState = async (variantId: string, stateIndex: number) => {
    if (confirm('Вы уверены, что хотите удалить это состояние?')) {
        const result = presenter.getModelVariantById(variantId);
        if (result.hasData() && result.data.states && result.data.states.length > 1) {
            const updatedStates = result.data.states.filter((_: any, index: number) => index !== stateIndex);
            controller.updateStates(variantId, updatedStates);
        }
    }
};

const handleAddState = (variantId: string) => {
    editingState.value = { variantId };
    showStateEditor.value = true;
};

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
};

const getDamageTypeName = (type: number): string => {
    const types = ['', 'Целая модель', 'Поцарапанная модель', 'Ломаная модель', 'Разрушенная модель'];
    return types[type] || 'Неизвестный тип';
};

const getDamageTypeClass = (type: number): string => {
    const classes = [
        '', // 0 - не используется
        'bg-green-100 text-green-800', // 1 - целая
        'bg-yellow-100 text-yellow-800', // 2 - поцарапанная
        'bg-orange-100 text-orange-800', // 3 - ломаная
        'bg-red-100 text-red-800' // 4 - разрушенная
    ];
    return classes[type] || 'bg-gray-100 text-gray-800';
};

const handleSaveState = (state: { type: number; image: string | null; price: number }, stateIndex?: number) => {
    const variantId = editingState.value.variantId;
    if (!variantId) return;

    const result = presenter.getModelVariantById(variantId);
    if (!result.hasData()) return;

    const variant = result.data;
    let updatedStates = [...variant.states];

    if (stateIndex !== undefined) {
        // Редактирование существующего состояния
        updatedStates[stateIndex] = {
            type: state.type,
            image: state.image,
            price: state.price
        };
    } else {
        // Добавление нового состояния
        updatedStates.push({
            type: state.type,
            image: state.image,
            price: state.price
        });
    }

    controller.updateStates(variantId, updatedStates);
    showStateEditor.value = false;
    editingState.value = {};
};

const handleCloseStateEditor = () => {
    showStateEditor.value = false;
    editingState.value = {};
};

// Автоматическая загрузка вариантов при изменении выбранной модели
watch(
    () => modelId.value,
    async (newModelId) => {
        console.log('ModelVariants: modelId changed to:', newModelId);
        if (newModelId) {
            console.log('ModelVariants: loading variants for model:', newModelId);
            await controller.loadModelVariants(newModelId);
        }
    },
    { immediate: true }
);

onMounted(async () => {
    console.log('ModelVariants: mounted, modelId:', modelId.value);
    if (modelId.value) {
        console.log('ModelVariants: loading variants on mount for model:', modelId.value);
        await controller.loadModelVariants(modelId.value);
    }
});
</script>

<template>
    <ConstructorLayout>
        <!-- Показываем редактор, если вариант выбран -->
        <ModelVariantEditor v-if="presenter.selectedModelVariant.value" />
        
        <!-- Иначе показываем список -->
        <div v-else class="model-variants-list">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h2 class="text-2xl font-bold">Варианты моделей</h2>
                <p v-if="customModelsPresenter.customModelViewModel.value" class="text-sm text-gray-600 mt-1">
                    Модель: {{ customModelsPresenter.customModelViewModel.value.name }}
                </p>
            </div>
            <button 
                @click="handleCreateModelVariant"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                :disabled="controller.creating.value || !modelId"
                :title="!modelId ? 'Выберите модель для создания варианта' : ''"
            >
                {{ controller.creating.value ? 'Создание...' : 'Создать вариант' }}
            </button>
        </div>

        <div v-if="controller.loading.value" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p class="mt-2">Загрузка вариантов...</p>
        </div>

        <div v-else-if="!modelId" class="text-center py-8">
            <p class="text-gray-500">Выберите модель для просмотра вариантов</p>
        </div>

        <div v-else-if="presenter.modelVariantsCount.value === 0" class="text-center py-8">
            <p class="text-gray-500">Нет созданных вариантов для этой модели</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="variant in presenter.modelVariantsViewModel.value" 
                :key="variant?.id || 'unknown'"
                class="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-semibold">{{ variant.name }}</h3>
                    <div class="flex space-x-2">
                        <button
                            @click="handleTogglePublished(variant.id, variant.isPublished)"
                            :class="[
                                'px-3 py-1 rounded-full text-sm font-medium',
                                variant.isPublished 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                            ]"
                        >
                            {{ variant.isPublished ? 'Опубликовано' : 'Черновик' }}
                        </button>
                    </div>
                </div>

                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-600 mb-2">Атрибуты:</h4>
                    <div class="space-y-1">
                        <div 
                            v-for="attr in variant.attributes" 
                            :key="attr.key"
                            class="text-sm"
                        >
                            <span class="font-medium">{{ attr.key }}:</span>
                            <span class="text-gray-600">{{ attr.value }}</span>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-600 mb-2">Состояния:</h4>
                    <div class="space-y-2">
                        <div 
                            v-for="(state, index) in (variant.states || [])" 
                            :key="index"
                            class="bg-gray-50 p-3 rounded-md border"
                        >
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-4">
                                        <span :class="getDamageTypeClass(state.type)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                            {{ getDamageTypeName(state.type) }}
                                        </span>
                                        <span class="text-lg font-semibold text-green-600">${{ state.price }}</span>
                                    </div>
                                    <div v-if="state.image" class="mt-2">
                                        <img 
                                            :src="state.image" 
                                            :alt="getDamageTypeName(state.type)"
                                            class="w-16 h-16 object-cover rounded border shadow-sm"
                                            @error="handleImageError"
                                        />
                                    </div>
                                </div>
                                <div class="flex space-x-1 ml-2">
                                    <button
                                        @click="handleEditState(variant.id, state, index)"
                                        class="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                                        title="Редактировать состояние"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        @click="handleDeleteState(variant.id, index)"
                                        class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                        title="Удалить состояние"
                                        :disabled="variant.states?.length <= 1"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        @click="handleAddState(variant.id)"
                        class="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                        + Добавить состояние
                    </button>
                </div>

                <div class="flex justify-between items-center">
                    <span class="text-xs text-gray-500">
                        ID: {{ variant.id?.slice(0, 8) || 'N/A' }}...
                    </span>
                    <button
                        @click="handleDeleteModelVariant(variant.id)"
                        class="text-red-500 hover:text-red-700 text-sm"
                        :disabled="controller.deleting.value"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>

        <ModelVariantConstructor
            v-if="showConstructor && modelId"
            :model-id="modelId"
            @close="handleCloseConstructor"
            @created="handleCloseConstructor"
        />

        <StateEditor
            v-if="showStateEditor"
            :variant-id="editingState.variantId || ''"
            :state="editingState.state"
            :state-index="editingState.stateIndex"
            @close="handleCloseStateEditor"
            @save="handleSaveState"
        />
        </div>
    </ConstructorLayout>
</template>

<style scoped>
.model-variants-list {
    padding: 1rem;
}
</style>
