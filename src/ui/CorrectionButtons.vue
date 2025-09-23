<script setup lang="ts">
export interface ICorrectButtonsProps {

}

const { } = defineProps<ICorrectButtonsProps>();

</script>

<template>
  <div class="">
    <button class="mr-2 p-1 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-bold"
          aria-hidden="true"
        >
          <path
            d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
          ></path>
        </svg></button
      ><button class="mr-2 p-1 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-italic"
          aria-hidden="true"
        >
          <line x1="19" x2="10" y1="4" y2="4"></line>
          <line x1="14" x2="5" y1="20" y2="20"></line>
          <line x1="15" x2="9" y1="4" y2="20"></line>
        </svg></button
      ><button class="p-1 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-align-center"
          aria-hidden="true"
        >
          <path d="M17 12H7"></path>
          <path d="M19 18H5"></path>
          <path d="M21 6H3"></path>
        </svg>
      </button>
  </div>

</template>