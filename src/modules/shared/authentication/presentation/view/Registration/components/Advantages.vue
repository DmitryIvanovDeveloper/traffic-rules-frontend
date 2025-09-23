<script setup lang="ts">
import RegistrationPresenter from "../../../presenter/registration.presenter";
import { TYPES } from "../../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import Card from "@/ui/Card.vue";
import CardContent from "@/ui/CardContent.vue";

const presenter = container.get<RegistrationPresenter>(
  TYPES.RegistrationPresenter
);


</script>

<template>
 <CardContent :title="'Наши преимущества'">
  <template #right>
    <span class="font-roboto-700 text-[20px] p-2 text-[#9747FF] text-left">
      _________
    </span>
  </template>
  <div class="flex flex-col  bg-[#FFFFFF] rounded-[12px] p-[25px] gap-[30px]">
    <div class="flex flex-col">
      <span class="font-rubik-700  text-[17px] text-left text-[#424242]">{{'Безопасное хранение данных'}}</span>
      <span class="font-rubik-500 text-[10px] text-left text-[#7D8B91]">{{'Защищенный личный кабинет для хранения ваших данных'}}</span>
    </div>

    <div class="flex flex-col ">
      <span class="font-rubik-700  text-[17px] text-left text-[#424242]">{{'Удобный личный кабинет'}}</span>
      <span class="font-rubik-500 text-[10px] text-left text-[#7D8B91]">{{'Простой и интуитивно понятный интерфейс'}}</span>
    </div>

    <div class="flex flex-col ">
      <span class="font-rubik-700  text-[17px] text-left text-[#424242]">{{'Доступ к персональной статистике'}}</span>
      <span class="font-rubik-500 text-[10px] text-left text-[#7D8B91]">{{'Анализ ваших данных и удобные отчеты'}}</span>
    </div>
     
  </div>
 </CardContent>
</template>
