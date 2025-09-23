<script setup lang="ts">
import Folder from '@assets/folder.svg'
import Create from '@assets/emptyFolder.svg'
import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { RouterPaths } from '@/app/router/router-paths';
import { useRouter } from 'vue-router';
import LevelsController from '../controller/levels.controller';
import LevelsPresenter from '../presenter/levels.presenter';

const controller = container.get<LevelsController>(TYPES.LevelsController);
const presenter = container.get<LevelsPresenter>(TYPES.LevelsPresenter);

const router = useRouter();

const createLevel = async (): Promise<void> => {
    const result = await controller.createLevel();
    if (result.hasData()) {
        return;
    }

    router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`);
}

const selectLevel = async (levelId: string): Promise<void> => {
    const result = await controller.selectLevel(levelId);
    if (result.hasData()) {
        return;
    }
    
    router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`);
}


</script>

<template>
    
    <div class="flex items-start gap-[25px] p-[60px]">
        <button :onclick="createLevel">
            <Create />
            <span>{{"Создать новую категорию"}}</span>
        </button>
        <button 
            v-for="(level, index) in presenter.levelsViewModel.value" 
            :key="index" :onclick="() => selectLevel(level.id)">
            <Folder />
            <span>{{level.name}}</span>
        </button>
    </div>
</template>