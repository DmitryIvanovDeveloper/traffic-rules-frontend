<script setup lang="ts">

const props = defineProps({
	value: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: 'Enter URL'
	}
});

const copyToClipboard = () => {
	if (props.value) {
		navigator.clipboard.writeText(props.value)
			.then(() => {
				console.log('Link copied to clipboard');
			})
			.catch(err => {
				console.error('Error copying text to clipboard: ', err);
			});
	}
};
</script>

<template>
	<div class="relative flex items-center">
		<input readonly type="text" v-model="props.value" :placeholder="props.placeholder"
			class="w-full  p-2 pr-15 border border-gray-300 rounded !bg-[#FFFFFF] truncate-text" />
		<button @click="copyToClipboard" class="absolute right-2 top-1/2 transform -translate-y-[20px] p-2 items-center"
			:aria-label="'Copy to clipboard'">
			<span class="material-icons text-gray-500">content_copy</span>
		</button>
	</div>
</template>

<style scoped>
button {
	cursor: pointer;
}

.material-icons {
	font-size: 24px;
}

.truncate-text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
