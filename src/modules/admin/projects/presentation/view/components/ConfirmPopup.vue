<script setup lang="ts">
import { Dialog } from 'primevue';
import { container } from "@/infrastructure/bootstrap/inversify.config";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import ProjectsController from '../../controller/projects.controller';
import ProjectsPresenter from '../../presenter/projects.presenter';
import { TYPES } from '../../../types';
import { useRouter } from 'vue-router';
import { RouterPaths } from '@/app/router/router-paths';

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);

const router = useRouter() 
const confirmCancel = async () => {
    router.push(RouterPaths.projectList);
    controller.changeConfirmCancelPopupVisible();
}

const confirmSave = async () => {
    await controller.saveProject();
    router.push(RouterPaths.projectList);

}
</script>

<template>
    <Dialog
        :visible="controller.confirmCancelPopupVisible.value" 
        class="!flex" 
        pt:root:class="!flex !border-0 !bg-[#EFF6F8] w-[600px] h-[300px] p-[70px] justify-center items-center" 
        pt:mask:class="backdrop-blur-sm " 
        :closable="true"
    >
        <template #container>
            <div class="flex flex-col px-4 gap-6 rounded-[20px] justify-center items-center gap-[60px]">
                <div class="relative flex items-center">
                    <span class="text-[#7D8B91]">{{ presenter.label.confirmCancel.title }}</span>
                </div>
    
                <div class="flex justufy-between items-center gap-4">
                    <UniversalRoundedButton 
                        :label="presenter.label.confirmCancel.saveContinue" 
                        :loading="controller.loading.value" 
                        class="!h-[40px] !bg-[#9747FF] !border-none !font-roboto-700 !text-[14px]" 
                        :handle-press="confirmSave
                    "/>

                    <UniversalRoundedButton 
                        type="secondary" 
                        :label="presenter.label.confirmCancel.cancelContinue" 
                        class="!h-[40px] !border-[#9747FF] !border-[1px] !bg-transparent !text-[#9747FF] !font-roboto-700 !text-[14px]"
                        :handle-press="confirmCancel" />
                </div>
            </div>
        </template>
       
    </Dialog>
</template>