<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import UniversalInput from "@/ui/UniversalInput.vue";
import AchievementsController from "../controller/achievements.controller";
import AchievementsPresenter from "../presenter/achievements.presenter";
import ToggleSwitch from "primevue/toggleswitch";
import { Textarea } from "primevue";
import ConstructorItemLayout from "@/ui/ConstructorItemLayout.vue";
import AchievementsIconSelection from "./components/AchievementsIconSelection.vue";
import UniversalSelect, { IOption } from "@/ui/UniversalSelect.vue";

const controller = container.get<AchievementsController>(
	TYPES.AchievementsController
);
const presenter = container.get<AchievementsPresenter>(
	TYPES.AchievementsPresenter
);

const router = useRouter();
</script>

<template>
	<div class="flex flex-col p-[20px] gap-[20px]">
	<ConstructorItemLayout :label="'Название достижения'">
		<UniversalInput 
			:label="''" 
			:value="presenter.achievementViewModel.value?.name"
			:onChange="(value) => controller.updateName(value as string)" 
		/>
	</ConstructorItemLayout>

	<div class="flex justify-between p-[10px] bg-[#EFF6F8]">
		<span>{{ "Активировать достижение" }}</span>
		<ToggleSwitch name="activation" @update:modelValue="(value) => controller.updatePublished(value)" />
	</div>

	<ConstructorItemLayout :label="'Описание'">
		<Textarea 
			class="w-full p-3 border border-gray-300 rounded h-28 bg-[#FFFFFF]" placeholder="Question text"
			:model-value="presenter.achievementViewModel.value?.description"
			@value-change="(value) => controller.updateDescription(value)"
		/>
	</ConstructorItemLayout>

	<AchievementsIconSelection />

	<ConstructorItemLayout label="Выберите категорию достежения">

		{{ presenter.achievementViewModel.value?.availableLevels }}
		<UniversalSelect
			label:=""
			:type="'multiple'"
			:options="presenter.achievementViewModel.value?.availableLevels"
			:onChange="(value: ReadonlyArray<IOption>) => controller.updateLevelsId(value.map((item) => item.id ?? ''))"
    	/>
	</ConstructorItemLayout>


	<ConstructorItemLayout label="Количество правильных ответов">
		<UniversalInput 
			:value="presenter.achievementViewModel.value?.correctAnswersInRow"
			:onChange="(value) => controller.updateNumCorrectAnswers(value as number)" type="number" 
		/>
	</ConstructorItemLayout>

	<ConstructorItemLayout label="Выберите вопросы для достижений">
		<UniversalSelect
			label:=""
			:type="'multiple'"
			:options="presenter.achievementViewModel.value?.availableQuestions"
			:onChange="(value: ReadonlyArray<IOption>) => controller.updateQuestionsId(value.map((item) => item.id ?? ''))"
    	/>
	</ConstructorItemLayout>
</div>

</template>
