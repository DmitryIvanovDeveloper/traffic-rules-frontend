<script setup lang="ts">
import RegistrationPresenter from "../../presenter/registration.presenter";
import { TYPES } from "../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Form from "./components/Form.vue";
import Advantages from "./components/Advantages.vue";
import Verefication from "./components/Verefication.vue";
import Help from "./components/Help.vue";
import CardContent from "@/ui/CardContent.vue";
import ButtonsSwitcher from "@/ui/Buttons/ButtonsSwitcher.vue";
import RegistrationController from "../../controller/registration.controller";
import { RegistrationType } from "../../../business/dtos/registration-type";

const presenter = container.get<RegistrationPresenter>(
  TYPES.RegistrationPresenter
);

const controller = container.get<RegistrationController>(
  TYPES.RegistrationController
);

</script>

<template>
  <div
    class="flex gap-[30px]"
  >
    <CardContent :title="presenter.labels.title">
      <template #right>
        <div class="grid w-full max-w-[250px]">
          <ButtonsSwitcher
            :value="presenter.registrationViewModel.value?.type"
            :options="[
              {
                label: presenter.labels.registrationType.business,
                value: RegistrationType.Business,
              },
              {
                label: presenter.labels.registrationType.personal,
                value: RegistrationType.Personal,
              },
            ]"
            :handlePress="(type) => controller.updateType(type)"
          />
        </div>
      </template>
      <Form />
    </CardContent>

    <div class="flex flex-col gap-[30px] justify-between">
      <Advantages />
      <Verefication />
      <Help />
    </div>
  </div>
</template>
