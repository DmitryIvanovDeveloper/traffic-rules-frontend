<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';

export interface IUploadFileProps {
    title?: string;
    accept?: string[];
    limit?: number;
    maxFileSizeMB?: number;
    isMultiple?: true;
    onUploaded: (files: File[]) => void
}

const { title, accept, limit, maxFileSizeMB, isMultiple, onUploaded } = withDefaults(defineProps<IUploadFileProps>(), {
    title: 'Прикрепите фото контейнерной площадки',
    accept: () => ['.gif', '.jpg', '.jpeg', '.png', '.bmp'],
    limit: 3,
    maxFileSizeMB: 3,
});

const files = ref<File[]>([]);

const maxBytes = computed(() => maxFileSizeMB * 1000000);

const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const handleSelect = async (event: FileUploadSelectEvent) => {
    const selected = Array.from(event.files as File[]);
    const availableSlots = limit - files.value.length;

    if (availableSlots <= 0) return;

    const validFiles = selected
        .slice(0, availableSlots)
        .filter(file => file.size <= maxBytes.value && accept.some(type => file.name.endsWith(type)));

    if (validFiles.length) {
        files.value.push(...validFiles);
        onUploaded(files.value);
    }
};

const removeFile = (index: number) => {
    files.value.splice(index, 1);
    onUploaded(files.value);
};;

const fileupload = ref();

</script>

<template>
    <div class="p-[16px] bg-white rounded-[4px] flex flex-col gap-[20px]">
        <span class="font-roboto-500 text-[18px] text-[#2D3E50] text-left pl-[8px]">
            {{ title }}
        </span>

        <div class="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:gap-[20px] p-2 rounded">
            <FileUpload 
                ref="fileupload" 
                mode="basic" 
                name="demo[]" 
                url="/api/upload" 
                :accept="`image/*`" 
                :maxFileSize="maxBytes"
                :customUpload="true"
                :auto="true"
                :multiple="isMultiple"
                chooseLabel="Прикрепить файл"
                choose-icon="null"
                labe
                class="!bg-[#6FC700] !text-white !rounded-md !border-none !h-[52px] !w-[194px] !font-roboto-500 block!justify-start"
                @select="handleSelect"
            />

            <span class="font-roboto-400 text-label text-[14px] text-left">
                {{
                    `Допустимые форматы: ${accept.join(', ')}. Размер файла не должен превышать ${maxFileSizeMB} МБ. Общее количество файлов должно быть не больше ${limit}.`
                }}
            </span>
        </div>

        <ul v-if="files.length" class="grid text-sm text-gray-700 gap-[10px]">
            <li v-for="(file, index) in files" :key="index" class="flex justify-between items-center">
                <span>{{ file.name }}</span>
                <button @click="removeFile(index)" class="text-text_danger font-roboto-400 text-[14px] text-xs hover:underline">Удалить</button>
            </li>
        </ul>
    </div>
   
</template>
