<script setup lang="ts">
import LevelEditor from "@/modules/admin/levels/presentation/view/LevelEditor.vue";
import QuestionEditor from "@/modules/admin/questions/presentation/view/QuestionEditor.vue";
import ConstructorLayout from "@/ui/ConstructorLayout.vue";


</script>

<template>
  <ConstructorLayout>
    <div class="grid w-full">
      <LevelEditor />
      <QuestionEditor />
    </div>
    <template #buttons>
      <!-- <div class="flex gap-[10px]">
        <Button
            @click="controller.nextQuestion"
            class="text-[#FFFFFF] px-4 py-2 rounded w-[48px] h-[38px] !border-none !bg-[#FF811B]"
            >
          <ArrowLeftIcon class="w-[15px] h-[15px]" />
        </Button>
        <Button
            @click="controller.previousQuestion"
            class="text-[#FFFFFF] px-4 py-2 rounded w-[48px] h-[38px] !border-none !bg-[#FF811B]"
        >
            <ArrowRightIcon class="w-[15px] h-[15px]" />
        </Button>
      </div> -->
    </template>
  </ConstructorLayout>
</template>
