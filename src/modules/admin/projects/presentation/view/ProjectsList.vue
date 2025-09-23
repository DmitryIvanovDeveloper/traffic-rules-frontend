<script setup lang="ts">
import Folder from '@/assets/folder.svg'
import Add from '@assets/emptyFolder.svg'
import Share from '@assets/share.svg'
import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { RouterPaths } from '@/app/router/router-paths';
import { useRouter } from 'vue-router';
import ProjectsPresenter from '../presenter/projects.presenter';
import ProjectsController from '../controller/projects.controller';

import { ref } from 'vue';
import { Dialog } from 'primevue';
import UniversalLinkInput from '@/ui/UniversalLinkInput.vue';
import UniversalRoundedButton from '@/ui/Buttons/UniversalRoundedButton.vue';
import ProjectUsers from './ProjectUsers.vue';
import Project from '../../business/entities/project';
import ProjectViewModel from '../presenter/view-models/project.view-model';

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);

const router = useRouter();

const createProject = async (): Promise<void> => {
    const result = await controller.createProject();
    if (!result.isSuccess) {
        return;
    }

    goToConstructor();
}

const loadProject = async (): Promise<void> => {
    const result = await controller.createProject();
    if (!result.isSuccess) {
        return;
    }

    goToConstructor();
}


const shareProject = ref<ProjectViewModel | undefined>()

const selectProject = async (projectId: string): Promise<void> => {
    const result = await controller.selectProject(projectId);
    if (!result.isSuccess) {
        return;
    }

    goToConstructor();
}

const goToConstructor = () => {
    router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`);
}

const visible = ref(false);
const email = ref<string>('');

</script>

<template>

    <div class="flex items-start gap-[25px] p-[60px]">
        <button :onclick="createProject" class="flex flex-col">
            <Add />
            <span>{{ "Создать Новый проект" }}</span>
        </button>

      
        <div
            class="flex flex-col w-[166px]"
            v-for="(project, index) in presenter.projectsViewModel.value"
            :key="index"
        >
                <button 
                    class="w-[166px]"
                    :onclick="() => selectProject(project.id)"
                >
                    <Folder />
                </button>

                <button 
                    class="absolute top-17 pl-[130px]"
                    :onclick="() => {
                    shareProject = project
                    visible = true
                }">
                    <Share />
                </button>
                <span :class="{'break-all': (project.name.value as string).length > 21}">{{ project.name.value }}</span>
        </div>


        <Dialog :header="'Отправить ссылку на игру'" v-model:visible="visible" class="!flex" pt:root:class=" !border-0 !bg-[#EFF6F8] w-[685px] h-[559px]" pt:mask:class="backdrop-blur-sm " :closable="true">
            <div class="flex flex-col px-4 gap-6 rounded-2xl">
                <div class="relative flex items-center">
                    <input 
                        type="text" 
                        v-model="email" 
                        :placeholder="'Введите Email'"
                        class="w-full  p-2 pr-15 border border-gray-300 rounded !bg-[#FFFFFF] truncate-text" 
                    />
                    <button 
                        @click="() => {
                            controller.updatedAddUser(shareProject?.id ?? '', email);
                            email = ''
                        }"
                        class="absolute right-2 top-1/2 transform -translate-y-[20px] p-2 items-center cursor-pointer"
                            :aria-label="'Copy to clipboard'">
                            <span class="material-icons text-gray-500">add</span>
                    </button>
                </div>

                <ProjectUsers 
                    :users="presenter.projectsViewModel.value?.find(d => d.id === shareProject?.id)?.users ?? []"
                    :remove="(value) => controller.updatedRemoveUser(shareProject?.id ?? '', value)"
                />
    
                <UniversalLinkInput
                    :type="'url'"
                    :value="`https://dmitryivanovdeveloper.github.io/hundred-cards-web/?project_id=${shareProject?.id}`"
                    readonly
                    :onChange="() => {}"
                />

                <div class="flex justufy-right items-center gap-4">
                    <UniversalRoundedButton :label="'Отправить'" :loading="controller.loading.value" class="!h-[40px] !bg-[#9747FF] !border-none !font-roboto-700 text-[11px]" :handle-press="() => {}"/>
                    <UniversalRoundedButton type="secondary" :label="'Отменить'" class="!h-[40px] !border-[#9747FF] !border-[1px] !bg-transparent !text-[#9747FF] !font-roboto-700 text-[11px]" :handle-press=" () => { visible = false}"/>
                </div>
        </div>
        </Dialog>
    </div>
</template>