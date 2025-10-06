<script setup lang="ts">
import { TYPES } from "../../types";
import { TYPES as CustomModelsTYPES } from "@/modules/admin/customModels/types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import ModelVariantsController from "../controller/model-variants.controller";
import ModelVariantsPresenter from "../presenter/model-variants.presenter";
import CustomModelsPresenter from "@/modules/admin/customModels/presentation/presenter/custom-models.presenter";
import { useRouter } from "vue-router";
import { RouterPaths } from "@/app/router/router-paths";
import ProjectItemList from "@/ui/ProjectItemList.vue";
import ProjectItemListSkeleton from "@/ui/ProjectItemListSkeleton.vue";
import { computed } from "vue";

const controller = container.get<ModelVariantsController>(TYPES.ModelVariantsController);
const presenter = container.get<ModelVariantsPresenter>(TYPES.ModelVariantsPresenter);
const customModelsPresenter = container.get<CustomModelsPresenter>(CustomModelsTYPES.CustomModelsPresenter);

const router = useRouter();

const selectModelVariant = async (id: string): Promise<void> => {
    console.log('ModelVariantsListBar: selectModelVariant called with id:', id);
    
    // Сначала переходим на страницу ModelVariants
    const newPath = `${RouterPaths.admin}/${RouterPaths.modelVariants}`;
    await router.push(newPath);
    console.log('ModelVariantsListBar: Navigated to ModelVariants page');
    
    // Небольшая задержка для переключения роута
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
        const result = await controller.selectModelVariant(id);
        console.log('ModelVariantsListBar: selectModelVariant result:', result);
        if (!result.isSuccess) {
            console.log('ModelVariantsListBar: selectModelVariant failed');
            return;
        }
        
        console.log('ModelVariantsListBar: selectModelVariant success - editor should now be visible');
    } catch (error) {
        console.error('ModelVariantsListBar: error in selectModelVariant:', error);
    }
};

const createModelVariant = async (): Promise<void> => {
    const modelId = customModelsPresenter.customModelViewModel.value?.id;
    if (!modelId) {
        console.error('ModelVariantsListBar: No model selected');
        return;
    }
    
    // Переход на страницу ModelVariants для создания нового варианта
    const newPath = `${RouterPaths.admin}/${RouterPaths.modelVariants}`;
    router.push(newPath);
};

const deleteModelVariant = async (id: string): Promise<void> => {
    await controller.deleteModelVariant(id);
};

// Преобразуем варианты в формат для ProjectItemList
const variantItems = computed(() => {
    return presenter.modelVariantsViewModel.value.map(variant => ({
        id: variant.id,
        name: variant.name,
        checked: false,
        edited: false,
        deleting: false,
        hasError: false
    }));
});

</script>

<template>
    <ProjectItemListSkeleton v-if="controller.loading.value" />
    <ProjectItemList 
        v-else
        :title="presenter.labels.title"
        :items="variantItems"
        :onCreate="createModelVariant"
        :onDelete="deleteModelVariant"
        :creating="controller.creating.value"
        :onEdit="() => {}"
        :onSelect="selectModelVariant"
        :selected-id="presenter.selectedModelVariant.value?.id ?? ''"
        :on-checked="() => {}"
    />
</template>

<style scoped>
div[draggable="true"] {
    transition: all 0.2s ease;
}

div[draggable="true"]:active {
    opacity: 0.7;
}

div[draggable="true"]:hover {
    cursor: move;
}

div[draggable="true"].bg-purple-50 {
    background-color: #f3e8ff;
}
</style>

