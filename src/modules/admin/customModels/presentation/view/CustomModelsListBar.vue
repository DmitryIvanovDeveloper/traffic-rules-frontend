<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import CustomModelsController from "../controller/custom-models.controller";
import CustomModelsPresenter from "../presenter/custom-models.presenter";
import { useRouter } from "vue-router";
import { RouterPaths } from "@/app/router/router-paths";
import ProjectItemList from "@/ui/ProjectItemList.vue";
import ProjectItemListSkeleton from "@/ui/ProjectItemListSkeleton.vue";

const controller = container.get<CustomModelsController>(
    TYPES.CustomModelsController
);
const presenter = container.get<CustomModelsPresenter>(TYPES.CustomModelsPresenter);

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
    } catch (error) {
        console.error('CustomModelsListBar: error in selectCustomModel:', error);
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
