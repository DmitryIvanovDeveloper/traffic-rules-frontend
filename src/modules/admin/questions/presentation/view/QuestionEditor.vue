<script setup lang="ts">
import { ref, onMounted } from "vue";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { TYPES } from "../../types";
import QuestionsController from "../controller/questions.controller";
import QuestionsPresenter from "../presenter/questions.presenter";
import Hamburger from "@assets/hamburger.svg";
import ConstructorItemLayout from "@/ui/ConstructorItemLayout.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import { Button } from "primevue";
import UniversalTextArea from "@/ui/UniversalTextArea.vue";

const controller = container.get<QuestionsController>(
	TYPES.QuestionsController
);
const presenter = container.get<QuestionsPresenter>(TYPES.QuestionsPresenter);

onMounted(() => {
	if (!presenter.questionsViewModel.value) {
		return;
	}
	if (presenter.questionsViewModel.value.length > 0) {
		selectQuestion(presenter.questionsViewModel.value[0].id);
	}
});

const selectQuestion = (id: string): void => {
	controller.selectQuestion(id);
};

const draggedItemId = ref<string | null>(null);
const dragOverItemId = ref<string | null>(null);

function onDragStart(itemId: string) {
    draggedItemId.value = itemId;
}

function onDragOver(e: DragEvent, targetItemId: string) {
    e.preventDefault();
    if (targetItemId !== draggedItemId.value) {
        dragOverItemId.value = targetItemId;
    }
}

function onDrop(targetItemId: string) {
    if (draggedItemId.value && targetItemId && draggedItemId.value !== targetItemId) {
        controller.changeAnswerOrders(draggedItemId.value, targetItemId);
    }

    draggedItemId.value = null;
    dragOverItemId.value = null;
}
</script>

<template>

	<div v-if="presenter.questionViewModel.value" class="flex flex-col gap-[50px]">
		<ConstructorItemLayout :label="presenter.labels.question">
			<UniversalTextArea 
				:onChange="(value) => controller.updateText(value)"
				placeholder="Question text" 
				:modelValue="(presenter.questionViewModel.value.name.value as string)" 
				:error="presenter.questionViewModel.value.name.error"
			/>
		</ConstructorItemLayout>

		<ConstructorItemLayout :label="presenter.labels.points" >
			<UniversalInput
				type="number"
				:value="presenter.questionViewModel.value.points.value"
				:onChange="(value) => controller.updatePoints(Number(value))"
				:error="presenter.questionViewModel.value.points.error"
			/>
		</ConstructorItemLayout>

		<div>
			<ConstructorItemLayout :label="presenter.labels.answers">
				<div
					v-for="(answer, index) in presenter.questionViewModel.value.answers" 
					:key="answer.id"
					:draggable="true"
					@dragstart="() => onDragStart(answer.id)"
					@dragover="(e) => onDragOver(e, answer.id)"
					@drop="() => onDrop(answer.id)"
					:class="[
						'flex items-center justify-between text-sm text-gray-600  rounded-lg transition-all duration-200 hover:bg-purple-100',{
					}]" 
					class="flex items-center gap-[8px]"
				>
					
					<Hamburger />

					<el-checkbox 
						v-model="answer.correct"
						@change="(value) => controller.updateAnswerCorrect(answer.id, value as boolean)" 
					/>
					<UniversalInput
						:onChange="(value) => controller.updateAnswerText(answer.id, value as string)"
						:value="answer.name.value" 
						class="flex-1 p-1"
						:error="answer.name.error"
					/>

					<button class="ml-2 text-gray-400 cursor-pointer"
						@click="() => controller.removeAnswer(answer.id)">
						✕
					</button>
				</div>

				<div class="flex justify-end mt-4">
					<Button
						:disabled="presenter.questionViewModel.value.answers.length >= 4"
						class="!bg-purple-500  !border-none !text-[#FFFFFF] !px-4 !py-2 rounded" 
						:onclick="() => controller.addNewAnswer()"
					>
						{{ presenter.labels.addAnswer }}
					</Button>
				</div>
			</ConstructorItemLayout>

		</div>
	</div>
</template>
