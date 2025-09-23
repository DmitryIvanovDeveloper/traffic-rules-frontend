<script setup lang="ts">
import { RouterPaths } from "@/app/router/router-paths";
import Logo from "@/ui/Logo.vue";
import { UserIcon, FolderIcon, ChartBarIcon, CogIcon, QuestionMarkCircleIcon, } from '@heroicons/vue/24/solid';
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();


// Store the selected route or section
const selected = ref<'projects' | 'account' | 'analytics' | 'settings' | 'help' | 'members'>('projects');

const buttons: { title: string; icon: any; type: 'projects' | 'account' | 'analytics' | 'settings' | 'help' | 'members'}[] = [
	{ title: 'Мой аккаунт', icon: UserIcon, type: 'account' },
	{ title: 'Проекты', icon: FolderIcon, type: 'projects' },
	{ title: 'Участники', icon: FolderIcon, type: 'members' },
	{ title: 'Аналитика', icon: ChartBarIcon, type: 'analytics' },
	{ title: 'Настройки', icon: CogIcon, type: 'settings' },
	{ title: 'Помощь', icon: QuestionMarkCircleIcon, type: 'help' },
];


const handlePress = (type: 'projects' | 'account' | 'analytics' | 'settings' | 'help' | 'members') => {
	selected.value = type; // Update selected route
	if (type === 'projects') {
		const newPath = `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.list}`;
		router.push(newPath);
	}

	if (type === 'account') {
		router.push(RouterPaths.account);
	}
	console.log(type === 'members')
	if (type === 'members') {
		router.push(RouterPaths.members);
	}
}
</script>

<template>
	<div class="flex flex-col min-w-[200px] h-full bg-[#B6CAD1] p-[20px] gap-[80px]">
		<Logo />

		<div class="flex flex-col gap-[30px] justify-left items-start">
			<!-- Iterate through the buttons array to render each button -->
			<button v-for="button in buttons" :key="button.type"
				class="icon-container p-[5px] flex gap-[10px] cursor-pointer" @click="() => handlePress(button.type)">
				<component :class="{ '!text-[#9747FF]': selected === button.type }" :is="button.icon" class="icon" />
				<span :class="{ '!text-[#9747FF]': selected === button.type }"
					class="text-[#FFFFFF] font-rubik-700 text-[16px]">{{ button.title }}</span>
			</button>
		</div>
	</div>
</template>


<style scoped>
.icon {
	width: 24px;
	height: 24px;
	color: #fff;
}
</style>
