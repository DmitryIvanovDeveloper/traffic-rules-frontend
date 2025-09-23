<script setup lang="ts">
import { Chip } from 'primevue';
import { UserViewModel } from '../presenter/view-models/project.view-model';
import UniversalInput from '@/ui/UniversalInput.vue';

export interface IEmailListProps {
	users: ReadonlyArray<UserViewModel>;
	remove: (id: string) => void
}

const { users, remove } = defineProps<IEmailListProps>();
</script>

<template>
	<div class="space-y-4 bg-[#FFFFFF] grid grid-cols-3 gap-[10px] p-[10px] overflow-y-auto min-h-[200px]">
		
		<div v-for="user in users" :key="user.id" class=" gap-4">
			<Chip :label="user.email" removable @remove="() => remove(user.id)">
				<template #removeicon="{ removeCallback, keydownCallback }">
					<i class="pi pi-minus-circle" @click="removeCallback" @keydown="keydownCallback" />
				</template>
			</Chip>
		</div>
	</div>
</template>

<style scoped>
/* Optional styling if you need to customize further */
button {
	cursor: pointer;
}
</style>
