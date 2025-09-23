<script setup lang="ts">
import { computed, onMounted } from 'vue';
import DOMPurify from 'dompurify';

export interface HTMLContentProps {
    content: string;
}

const { content } = defineProps<HTMLContentProps>();

const sanitizedContent = computed(() => DOMPurify.sanitize(content));
const containsHtml = computed(() => /<\/?[a-z][\s\S]*>/i.test(content));

</script>

<template>
    <div class="prose max-w-none">
        <p v-if="containsHtml" v-html="sanitizedContent" />
        <p v-else>{{ content }}</p>
      </div>
</template>

