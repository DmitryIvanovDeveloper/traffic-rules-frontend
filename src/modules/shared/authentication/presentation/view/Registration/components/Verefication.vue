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
 <CardContent :title="'Процесс верификации'">
  <template #right>
    <span class="font-roboto-700 text-[20px] p-2 text-[#9747FF] text-left">
      _________
    </span>
  </template>
    <div class="flex flex-col w-[409px] bg-[#FFFFFF] rounded-[12px] w-[371px] p-[20px] gap-[30px]">
      <div class="flex flex-col">
        <span class="font-roboto-600 text-[17px] text-left text-[#424242]">{{'Заполните форму регистрации'}}</span>
      </div>
  
      <div class="flex flex-col ">
        <span class="font-roboto-600 text-[17px] text-left text-[#424242]">{{'Подтвердите email и телефон'}}</span>
      </div>
  
      <div class="flex flex-col ">
        <span class="font-roboto-600 text-[17px] text-left text-[#424242]">{{'Получите доступ к платформе'}}</span>
      </div>
       
    </div>
 </CardContent>
</template>
