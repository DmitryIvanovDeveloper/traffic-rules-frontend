<script setup lang="ts">
import Folder from '@assets/folder.svg'
import Create from '@assets/emptyFolder.svg'
import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { RouterPaths } from '@/app/router/router-paths';
import { useRouter } from 'vue-router';
import QuestionsController from '../controller/questions.controller';
import QuestionsPresenter from '../presenter/questions.presenter';

const controller = container.get<QuestionsController>(TYPES.QuestionsController);
const presenter = container.get<QuestionsPresenter>(TYPES.QuestionsPresenter);

const router = useRouter();

const createQueation = async (): Promise<void> => {
    await controller.createQuestion();
    router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`);
}

</script>

<template>
    
    <div class="flex items-start gap-[25px] p-[60px]">
        <button :onclick="createQueation">
            <Create />
            <span>{{"Создать новую категорию"}}</span>
        </button>
        <button v-for="(item, index) in presenter.questionsViewModel.value" :key="index">
            <Folder />
            <span>{{item.name.value}}</span>
        </button>
    </div>
</template>