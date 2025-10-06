<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import CustomModelsController from "../controller/custom-models.controller";
import CustomModelsPresenter from "../presenter/custom-models.presenter";
import { useRouter } from "vue-router";
import { nextTick } from "vue";
import { RouterPaths } from "@/app/router/router-paths";
import ProjectItemList from "@/ui/ProjectItemList.vue";
import ProjectItemListSkeleton from "@/ui/ProjectItemListSkeleton.vue";
import { TYPES as ModelVariantsTYPES } from "@/modules/admin/modelVariants/types";
import ModelVariantsController from "@/modules/admin/modelVariants/presentation/controller/model-variants.controller";
import ModelVariantsPresenter from "@/modules/admin/modelVariants/presentation/presenter/model-variants.presenter";

const controller = container.get<CustomModelsController>(
    TYPES.CustomModelsController
);
const presenter = container.get<CustomModelsPresenter>(TYPES.CustomModelsPresenter);
const modelVariantsController = container.get<ModelVariantsController>(ModelVariantsTYPES.ModelVariantsController);
const modelVariantsPresenter = container.get<ModelVariantsPresenter>(ModelVariantsTYPES.ModelVariantsPresenter);

const router = useRouter();

const selectCustomModel = async (id: string): Promise<void> => {
    console.log('CustomModelsListBar: selectCustomModel called with id:', id);
    try {
        const result = await controller.selectCustomModel(id);
        console.log('CustomModelsListBar: selectCustomModel result:', result);
        if (!result.isSuccess) {
            console.log('CustomModelsListBar: selectCustomModel failed');
            return;
        }
        
        console.log('CustomModelsListBar: selectCustomModel success, going to constructor');
        goToConstructor();
        
        // Автоматически выбираем первый вариант модели
        await selectFirstModelVariant(id);
    } catch (error) {
        console.error('CustomModelsListBar: error in selectCustomModel:', error);
    }
};

const selectFirstModelVariant = async (modelId: string): Promise<void> => {
    console.log('CustomModelsListBar: selectFirstModelVariant for model:', modelId);
    
    // Варианты уже загружены через CustomModelSelectedEventLoadModelVariantsHandler
    // Просто ждем немного, чтобы данные успели загрузиться
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Получаем список вариантов
    const variants = modelVariantsPresenter.modelVariants.value;
    console.log('CustomModelsListBar: variants from presenter:', variants);
    
    if (variants && variants.length > 0) {
        const firstVariant = variants[0];
        console.log('CustomModelsListBar: auto-selecting first variant:', firstVariant.id);
        
        // Выбираем первый вариант
        await modelVariantsController.selectModelVariant(firstVariant.id);
        console.log('CustomModelsListBar: first variant selected');
    } else {
        console.log('CustomModelsListBar: no variants found for this model');
    }
};

const goToConstructor = (): void => {
  console.log('CustomModelsListBar: goToConstructor called');
  console.log('CustomModelsListBar: current route:', router.currentRoute.value.path);
  const newPath = `${RouterPaths.admin}/${RouterPaths.customModels}`;
  console.log('CustomModelsListBar: navigating to:', newPath);
  router.push(newPath);
}

const createCustomModel = async (): Promise<void> => {
    const result = await controller.createCustomModel();
    if (!result.isSuccess) {
        return;
    }
    
    goToConstructor();
    
    // После создания новой модели очищаем выбранный вариант
    // так как у новой модели еще нет вариантов
    const newModelId = presenter.customModelViewModel.value?.id;
    if (newModelId) {
        console.log('CustomModelsListBar: new model created, clearing selected variant');
        // Можно попробовать загрузить варианты, но их еще нет
        await selectFirstModelVariant(newModelId);
    }
};

</script>

<template>
    <ProjectItemListSkeleton v-if="presenter.customModelsViewModel.value === undefined" />
    <ProjectItemList 
        v-else
        :title="presenter.labels.title"
        :items="presenter.customModelsViewModel.value"
        :onCreate="createCustomModel"
        :onDelete="controller.deleteCustomModel"
        :creating="controller.creating.value"
        :onEdit="() => {}"
        :onSelect="selectCustomModel"
        :selected-id="presenter.customModelViewModel.value?.id ?? ''"
        :on-checked="() => {}"
    />
    
    
</template>

<style scoped>
/* Optional: Add a smooth transition to the items */
div[draggable="true"] {
    transition: all 0.2s ease;
}

div[draggable="true"]:active {
    opacity: 0.7;
    /* Make the item semi-transparent when dragging */
}

div[draggable="true"]:hover {
    cursor: move;
    /* Change cursor when hovering over draggable items */
}

/* Highlight the item when dragged over */
div[draggable="true"].bg-purple-50 {
    background-color: #f3e8ff;
    /* Lighter background color when dragged over */
}
</style>
