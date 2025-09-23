<script setup lang="ts">
import ProjectsController from "../controller/projects.controller";
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import ProjectsPresenter from "../presenter/projects.presenter";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import ConfirmPopup from "./components/ConfirmPopup.vue";
import Header from "@/ui/Header.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import { error } from "console";
import { onMounted } from "vue";

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);

onMounted(() => {
    controller.edit(false)
});
</script>

<template>
    <Header>
        <template #title>
            <div v-if="!controller.isEdit.value" class="flex items-center gap-[10px]">
                <span  class="font-roboto-700 text-[20px] text-[#92A0A6]">{{ presenter.projectViewModel.value?.name.value }}</span>
                <button @click="() => controller.edit(true)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-square-pen text-gray-400" aria-hidden="true">
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path
                            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
                        </path>
                    </svg>
                </button>
            </div>
            <div>
                <UniversalInput 
                    v-if="controller.isEdit.value" 
                    :onChange="value => controller.updateName(value as string)"
                    @blur="() => controller.edit(false)"
                    :value="presenter.projectViewModel.value?.name.value"
                    :error="presenter.projectViewModel.value?.name.error"
                />
                <!-- <input 
                    @input="(event) => controller.updateName((event.target as HTMLInputElement).value)"
                    :value="presenter.projectViewModel.value?.name.value" 
                    v-if="controller.isEdit.value" 
                    class="p-[6px] bg-[#FFFFFF] font-roboto-700 text-[20px] text-[#92A0A6]"
                    :class="[{'!text-[#FF6666]': !!presenter.projectViewModel.value?.name.error}]"
                    @blur="() => controller.edit(false)"
                /> -->

            </div>
        </template>
        <template #buttons>
            <div class="grid grid-flow-col gap-[15px]">
                <UniversalRoundedButton :label="'Сохранить'" :loading="controller.loading.value" class="!h-[40px] !bg-[#9747FF] !border-none !font-roboto-700 text-[11px]" :handle-press="controller.saveProject"/>
                <UniversalRoundedButton type="secondary" :label="'Отменить'" class="!h-[40px] !border-[#9747FF] !border-[1px] !bg-transparent !text-[#9747FF] !font-roboto-700 text-[11px]" :handle-press="controller.changeConfirmCancelPopupVisible"/>
            </div>
            
        </template>
    </Header>

    <ConfirmPopup />
</template>
