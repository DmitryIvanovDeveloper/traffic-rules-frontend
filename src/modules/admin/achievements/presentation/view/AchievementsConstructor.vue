<script setup lang="ts">
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { TYPES } from "../../types";
import AchievementsController from "../controller/achievements.controller";
import AchievementsEditor from "./AchievementsEditor.vue";
import ConstructorLayout from "@/ui/ConstructorLayout.vue";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/vue/24/solid";

const controller = container.get<AchievementsController>(TYPES.AchievementsController)

</script>

<template>
  <ConstructorLayout>
      <AchievementsEditor />
      <template #buttons>
        <div class="flex gap-[10px]">
          <Button
              @click="controller.nextAchievement"
              class="text-[#FFFFFF] px-4 py-2 rounded w-[48px] h-[38px] !border-none !bg-[#FF811B]"
              >
            <ArrowLeftIcon class="w-[15px] h-[15px]" />
          </Button>
          <Button
              @click="controller.previousAchievement"
              class="text-[#FFFFFF] px-4 py-2 rounded w-[48px] h-[38px] !border-none !bg-[#FF811B]"
          >
              <ArrowRightIcon class="w-[15px] h-[15px]" />
          </Button>
        </div>
      </template>
  </ConstructorLayout>
</template>
