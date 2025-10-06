<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { TYPES } from '../../types';
import CustomModelsController from '../controller/custom-models.controller';
import CustomModelsPresenter from '../presenter/custom-models.presenter';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import CustomModelConstructor from './CustomModelConstructor.vue';

const controller = container.get<CustomModelsController>(TYPES.CustomModelsController);
const presenter = container.get<CustomModelsPresenter>(TYPES.CustomModelsPresenter);

const projectId = ref<string>('');
const showConstructor = ref<boolean>(false);

const handleCreateCustomModel = () => {
    showConstructor.value = true;
};

const handleCloseConstructor = () => {
    showConstructor.value = false;
};

const handleDeleteCustomModel = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту модель?')) {
        await controller.deleteCustomModel(id);
    }
};

const handleTogglePublished = async (id: string, isPublished: boolean) => {
    controller.updatePublished(id, !isPublished);
};

onMounted(async () => {
    if (projectId.value) {
        await controller.loadCustomModels(projectId.value);
    }
});
</script>

<template>
    <div class="custom-models-list">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Пользовательские модели</h2>
            <button 
                @click="handleCreateCustomModel"
                class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                :disabled="controller.creating.value"
            >
                <svg v-if="!controller.creating.value" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <svg v-else class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ controller.creating.value ? 'Создание...' : 'Создать модель' }}</span>
            </button>
        </div>

        <div v-if="controller.loading.value" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
            <p class="mt-4 text-gray-600 font-medium">Загрузка моделей...</p>
        </div>

        <div v-else-if="presenter.customModelsCount === 0" class="text-center py-16">
            <div class="max-w-md mx-auto">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Нет созданных моделей</h3>
                <p class="text-gray-500 mb-6">Создайте свою первую модель с состояниями и атрибутами</p>
                <button 
                    @click="handleCreateCustomModel"
                    class="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Создать первую модель</span>
                </button>
            </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="model in presenter.customModels" 
                :key="model?.id || 'unknown'"
                v-if="model && model.id"
                class="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-semibold">{{ model.name }}</h3>
                    <div class="flex space-x-2">
                        <button
                            @click="handleTogglePublished(model.id, model.isPublished)"
                            :class="[
                                'px-3 py-1 rounded-full text-sm font-medium',
                                model.isPublished 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                            ]"
                        >
                            {{ model.isPublished ? 'Опубликовано' : 'Черновик' }}
                        </button>
                    </div>
                </div>

                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-600 mb-2">Атрибуты:</h4>
                    <div class="space-y-1">
                        <div 
                            v-for="attr in model.attributes" 
                            :key="attr.key"
                            class="text-sm"
                        >
                            <span class="font-medium">{{ attr.key }}:</span>
                            <span class="text-gray-600">{{ attr.values?.join(', ') || 'N/A' }}</span>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-600 mb-3">Состояния модели:</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div
                            v-for="(state, index) in model.states"
                            :key="index"
                            class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3 mb-2">
                                        <span :class="presenter.getDamageTypeClass(state.type)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                            {{ presenter.getDamageTypeName(state.type) }}
                                        </span>
                                    </div>
                                    <div class="text-2xl font-bold text-green-600 mb-2">
                                        ${{ state.price.toLocaleString('en-US') }}
                                    </div>
                                </div>
                                <div class="flex flex-col items-end">
                                    <div v-if="state.image" class="mb-2">
                                        <img
                                            :src="state.image"
                                            :alt="presenter.getDamageTypeName(state.type)"
                                            class="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md"
                                            @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                                        />
                                    </div>
                                    <div v-else class="w-20 h-20 bg-gray-200 rounded-lg border-2 border-white shadow-md flex items-center justify-center">
                                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between items-center">
                    <span class="text-xs text-gray-500">
                        ID: {{ model.id?.slice(0, 8) || 'N/A' }}...
                    </span>
                    <button
                        @click="handleDeleteCustomModel(model.id)"
                        class="text-red-500 hover:text-red-700 text-sm"
                        :disabled="controller.deleting.value"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>

        <CustomModelConstructor
            v-if="showConstructor"
            :project-id="projectId"
            @close="handleCloseConstructor"
            @created="handleCloseConstructor"
        />
    </div>
</template>

<style scoped>
.custom-models-list {
    padding: 1rem;
}
</style>
