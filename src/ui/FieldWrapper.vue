<script setup lang="ts">
import { watch } from 'vue';
import RequiredPointer from './RequiredPointer.vue';
import Message from 'primevue/message';

export interface IFieldWrapperInputProps {
    error?: string;
    label?: string;
    isRequired?: boolean;
    errorlink?: {
        title: string;
        path: string;
    };
}

const { error, label, errorlink, isRequired } = defineProps<IFieldWrapperInputProps>();

</script>

<template>
    <div class="flex flex-col gap-1" >
        <label> {{ label }} <RequiredPointer v-show="isRequired" /> </label>

        <slot />

        <div>
            <Message v-if="error" size="small" severity="secondary" variant="simple" class="block text-left text-[14px] font-roboto-400 !text-[#FF6666]">
                {{ error }}
                <router-link v-if="errorlink" :to="errorlink?.path" class="text-[#01AEEA] text-[14px] hover:text-[#01AEEA] text-left">{{
                    errorlink.title
                }}</router-link>
            </Message>
           
        </div>
    </div>
</template>
