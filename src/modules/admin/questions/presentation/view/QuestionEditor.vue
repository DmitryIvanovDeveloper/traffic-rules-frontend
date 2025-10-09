<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
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

// Image upload functionality
const imageInputRef = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string | null>(null);

// Initialize image preview when question changes
watch(() => presenter.questionViewModel.value, (newQuestion) => {
	console.log('🔍 QuestionEditor: question changed', newQuestion);
	if (newQuestion?.image.value && newQuestion.image.value.trim() !== '') {
		console.log('🖼️ QuestionEditor: setting image preview', newQuestion.image.value);
		imagePreview.value = newQuestion.image.value;
	} else {
		console.log('🖼️ QuestionEditor: no image, clearing preview. image.value:', newQuestion?.image.value);
		imagePreview.value = null;
	}
}, { immediate: true, deep: true });

const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите файл изображения');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Размер файла не должен превышать 5MB');
            return;
        }
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            imagePreview.value = result;
            controller.updateImage(result);
        };
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    console.log('🗑️ QuestionEditor: removing image');
    imagePreview.value = null;
    controller.updateImage(null);
    if (imageInputRef.value) {
        imageInputRef.value.value = '';
    }
    
    // Force update after a short delay
    setTimeout(() => {
        console.log('🔄 QuestionEditor: forcing imagePreview update after timeout');
        imagePreview.value = null;
    }, 100);
};

const openImageSelector = () => {
    imageInputRef.value?.click();
};

// Computed property for current image
const currentImage = computed(() => {
    const vmImage = presenter.questionViewModel.value?.image.value;
    const result = imagePreview.value || (vmImage && vmImage.trim() !== '' ? vmImage : null);
    console.log('🖼️ currentImage computed:', { imagePreview: imagePreview.value, vmImage, result });
    return result;
});

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

		<ConstructorItemLayout :label="presenter.labels.image">
			<div class="space-y-4">
				<!-- Hidden file input -->
				<input
					ref="imageInputRef"
					type="file"
					accept="image/*"
					@change="handleImageUpload"
					class="hidden"
				/>
				
				<!-- Image preview or upload button -->
				<div v-if="currentImage" class="relative">
					<img
						:src="currentImage"
						alt="Question image preview"
						class="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
					/>
					<button
						@click="removeImage"
						class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
					>
						✕
					</button>
				</div>
				
				<!-- Upload button -->
				<button
					v-else
					@click="openImageSelector"
					class="w-full max-w-md h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
				>
					<svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
					</svg>
					<span class="text-sm">Нажмите для загрузки изображения</span>
				</button>
			</div>
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
