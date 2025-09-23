<script setup lang="ts">

import { Skeleton } from "primevue";

</script>

<template>
	
    <div class="flex flex-col gap-[10px] w-full pl-6 overflow-auto max-h-[400px]">
      <div v-for="(item, index) in ['','', '']">
        <Skeleton width="15rem" class="!h-[30px] mb-2"></Skeleton>
      </div>
    </div>
</template>
