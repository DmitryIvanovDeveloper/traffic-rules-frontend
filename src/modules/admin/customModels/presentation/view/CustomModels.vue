<script setup lang="ts">
import CustomModelsList from './CustomModelsList.vue';
import CustomModelEditor from './CustomModelEditor.vue';
import CustomModelsPresenter from '../presenter/custom-models.presenter';
import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import ConstructorLayout from "@/ui/ConstructorLayout.vue";

const presenter = container.get<CustomModelsPresenter>(TYPES.CustomModelsPresenter);
</script>

<template>
    <ConstructorLayout>
        <CustomModelEditor v-if="presenter.customModelViewModel.value" />
        <div v-else class="custom-models">
            <CustomModelsList />
        </div>
    </ConstructorLayout>
</template>

<style scoped>
.custom-models {
    padding: 1rem;
}
</style>
