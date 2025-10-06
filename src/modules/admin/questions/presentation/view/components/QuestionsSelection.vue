<script setup lang="ts">
import UniversalSelect from '@/ui/UniversalSelect.vue';
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { TYPES } from '../../../types';
import QuestionsPresenter from '../../presenter/questions.presenter';

const presenter = container.get<QuestionsPresenter>(TYPES.QuestionsPresenter);

export interface IQuestionsSelectionProps {
    onChange: (id: string) => void;
}

const { onChange } = defineProps<IQuestionsSelectionProps>();

</script>

<template>
    <UniversalSelect
        label:=""
        :type="'multiple'"
        :options="(presenter.questionsViewModel.value || []).map(question => ({ label: question.id, value: question.name }))"
        :onChange="onChange"
    />
</template>s