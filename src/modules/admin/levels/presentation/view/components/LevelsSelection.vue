<script setup lang="ts">
import UniversalSelect from '@/ui/UniversalSelect.vue';
import { container } from "@/infrastructure/bootstrap/inversify.config";
import LevelsPresenter from "../../presenter/levels.presenter";
import { TYPES } from '../../../types';

const presenter = container.get<LevelsPresenter>(TYPES.LevelsPresenter);

export interface ILevelsSelectionProps {
    onChange: (id: string) => void;
}

const { onChange } = defineProps<ILevelsSelectionProps>();

</script>

<template>
    <UniversalSelect
        label:=""
        :type="'multiple'"
        :options="presenter.levelsViewModel.value?.map(level => ({ label: level.id, value: level.name }))"
        :onChange="onChange"
    />
</template>s