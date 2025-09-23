<script setup lang="ts">
import Hamburger from "@assets/hamburger.svg";
import Delete from 'vue-material-design-icons/DeleteOutline.vue';

export interface IProjectSidbarElementLayout {
	readonly title?: string;
	onEdit: () => void;
	onDelete: () => void;
	onSelect: () => void;
	onChecked: (value: boolean) => void;
	readonly droppable: boolean;
	readonly selected: boolean;
	readonly checkable: boolean;
	readonly checked?: boolean;
	readonly edited?: boolean;
	readonly deleting?: boolean;
	readonly error?: boolean;
	readonly published?: boolean;
}

const { title, onEdit,onDelete, onSelect, droppable, checkable, checked, edited, deleting, published } = defineProps<IProjectSidbarElementLayout>();

</script>
<template>
	<div
		:class="[{'border-[#FFFFF]': error }]"
		class="flex items-center text-sm text-gray-600 shadow-none transition-all !duration-200 underline-offset-4 gap-[10px]"
	>
		<Hamburger v-if="droppable" />

		<el-checkbox 
			v-if="checkable" 
			:checked="published" 
			@change="(value) => onChecked(value as boolean)" 
		/>
		<div 
			class="flex justify-between w-full p-1 cursor-pointer hover:bg-gray-200"
			:class="[selected ? 'bg-[#F7F7F7] text-blue-600' : '']"
		>
			<button
				@click="onSelect"
				class="flex items-center gap-[10px] w-full p-1 cursor-pointer hover:bg-gray-200"
				:class="[selected ? 'bg-[#F7F7F7] text-blue-600' : '']"
			>
				<span class="font-roboto-400 text-[13px] text-[#424242] text-left block">
					{{ title }}
				</span>	
		</button>
	

			<div class="flex gap-[10px] items-center">
				<span v-if="edited">⚠️</span>
				<span v-if="error">❗</span>
<!-- 
				<button @click="onEdit" class="cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						class="lucide lucide-square-pen text-gray-400" aria-hidden="true">
						<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
						<path
							d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
						</path>
					</svg>
				</button> -->
				
				<button :onclick="onDelete" class="flex items-center cursor-pointer">
					<svg v-if="!deleting" xmlns="http://www.w3.org/2000/svg" width="24" height="1\24" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						class="lucide lucide-square-xmark text-gray-400" aria-hidden="true">
						<path d="M9 9l6 6"></path>
						<path d="M15 9l-6 6"></path>
					</svg>
					<span v-if="deleting" class="loader inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
				</button>

			</div>
			
		</div>
	</div>
</template>
