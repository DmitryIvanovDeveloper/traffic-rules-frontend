<script setup lang="ts">
import ProjectsController from "../controller/projects.controller";
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { RouterPaths } from "@/app/router/router-paths";
import { useRouter } from "vue-router";
import ProjectsPresenter from "../presenter/projects.presenter";
import ProjectItemList from "@/ui/ProjectItemList.vue";
import ProjectItemListSkeleton from "@/ui/ProjectItemListSkeleton.vue";

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);

const router = useRouter();

const createProject = async (): Promise<void> => {
    const result = await controller.createProject();
    if (!result.isSuccess) {
        return;
    }

    router.push(
        `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`
    );
};

const selectProject = async (id: string): Promise<void> => {
    const result = await controller.selectProject(id);
    if (!result.isSuccess) {
        return;
    }

    router.push(
        `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`
    );
};

const deleteProject = async (id: string): Promise<void> => {
    await controller.deleteProject(id);
};

</script>

<template>
    <ProjectItemListSkeleton v-if="presenter.projectsViewModel.value === undefined"/>
    <ProjectItemList
        v-else
        :title="presenter.label.title"
        :items="presenter.projectsViewModel.value.map(i => ({
            id: i.id,
            name: i.name.value as string,
            checked: false,
            edited: i.edited,
            deleting: i.deleting,
            hasError: i.hasError
        })) ?? []" 
        :onCreate="createProject"
        :onDelete="deleteProject"
        :creating="controller.creating.value"
        :onEdit="() => {}"
        :onSelect="selectProject"
        :selected-id="presenter.projectViewModel.value?.id ?? ''"
        :on-checked="() => {}"
    />
</template>
