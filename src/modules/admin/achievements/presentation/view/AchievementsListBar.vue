<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import AchievementsController from "../controller/achievements.controller";
import AchievementsPresenter from "../presenter/achievements.presenter";
import { useRouter } from "vue-router";
import { RouterPaths } from "@/app/router/router-paths";
import ProjectItemList from "@/ui/ProjectItemList.vue";

const controller = container.get<AchievementsController>(
    TYPES.AchievementsController
);
const presenter = container.get<AchievementsPresenter>(TYPES.AchievementsPresenter);

const router = useRouter();

const selectAchievement = async (id: string): Promise<void> => {
    const result = await controller.selectAchievement(id);
    if (!result.isSuccess) {
        return;
    }
    
    goToConstructor()
};

const goToConstructor = (): void => {
  router.push(`${RouterPaths.achievements}`);
}

const createAchievement = async (): Promise<void> => {
    await controller.createAchievement()
};

</script>

<template>
    <ProjectItemList 
		:title="presenter.labels.title"
		:items="presenter.achievementsViewModel.value"
		:onCreate="createAchievement"
		:onDelete="controller.deleteAchievement"
        :creating="controller.creating.value"
		:onEdit="() => {}"
		:onSelect="selectAchievement"
		:selected-id="presenter.achievementViewModel.value?.id ?? ''"
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
