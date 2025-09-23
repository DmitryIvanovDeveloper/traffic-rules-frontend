<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import LevelsController from "../controller/levels.controller";
import LevelsPresenter from "../presenter/levels.presenter";
import UniversalInput from "@/ui/UniversalInput.vue";
import ConstructorItemLayout from "@/ui/ConstructorItemLayout.vue";
import { error } from "console";

const controller = container.get<LevelsController>(TYPES.LevelsController);
const presenter = container.get<LevelsPresenter>(TYPES.LevelsPresenter);

const router = useRouter();
</script>

<template>
  <div class="mb-8">
	<ConstructorItemLayout 
		v-if="presenter.levelViewModel.value"
		:label="presenter.labels.categoryName"
	>
		<UniversalInput
			:label="''"
			:value="presenter.levelViewModel.value?.name.value"
			:onChange="(value) => controller.updateText(presenter.levelViewModel.value?.id ?? '', value as string)"
			:error="presenter.levelViewModel.value?.name.error"
		/>
	</ConstructorItemLayout>

  </div>
</template>
