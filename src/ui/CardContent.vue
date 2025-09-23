<script setup lang="ts">
import Card from "./Card.vue";

export interface IAuthPageProps {
  title: string;
}

const { title } = defineProps<IAuthPageProps>();
</script>

<template>
  <Card>
    <div class="flex justify-between items-center">
      <slot name="icon" />
      <span
        class="block font-roboto-700 text-[20px] text-[#9747FF] text-left"
      >
        {{ title }}
      </span>
      <slot name="right" />
    </div>

    <slot />
  </Card>
</template>
