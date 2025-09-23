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
  <CardContent :title="'Нужна помощь'">
    <template #right>
      <span class="font-roboto-700 text-[20px] text-[#9747FF] text-left">
        _________
      </span>
    </template>
    <div
      class="flex flex-col w-[409px] bg-[#FFFFFF] rounded-[12px] w-[371px] p-[15px] gap-[10px]"
    >
      <div class="flex flex-col">
        <span class="font-roboto-600 text-[17px] text-left text-[#424242]">{{
          "Свяжитесь с нашей службой поддержки"
        }}</span>
      </div>

      <div class="flex flex-col">
        <span class="font-roboto-500 text-[17px] text-left text-[#424242]">{{
          "+7 (000) 000-00-00 "
        }}</span>
      </div>

      <div class="flex flex-col">
        <span class="font-roboto-500 text-[17px] text-left text-[#424242]">{{
          "support@example.com"
        }}</span>
      </div>
    </div>
  </CardContent>
</template>
