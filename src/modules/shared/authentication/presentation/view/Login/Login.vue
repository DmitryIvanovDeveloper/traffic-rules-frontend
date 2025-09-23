<script setup lang="ts">
import { TYPES } from "../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import CardContent from "@/ui/CardContent.vue";
import ButtonsSwitcher from "@/ui/Buttons/ButtonsSwitcher.vue";
import LoginPresenter from "../../presenter/login.presenter";
import LoginController from "../../controller/login.controller";
import Form from "./components/Form.vue";
import { LoginType } from "../../../business/entities/login";

const presenter = container.get<LoginPresenter>(TYPES.LoginPresenter);
const controller = container.get<LoginController>(TYPES.LoginController);

</script>

<template>
  <div class="flex w-[400px]">

    <CardContent :title="'Авторизация'">
        <template #right>
          <div class="flex w-[200px]">
            <ButtonsSwitcher
              :value="presenter.loginVewModel.value?.type"
              :options="[
                {
                  label: presenter.labels.loginType.phone,
                  value: LoginType.Phone
                },
                {
                  label: presenter.labels.loginType.email,
                  value: LoginType.Email
                },
              ]"
              :handle-press="(type) => controller.updateType(type)"
            />
          </div>
        </template>
        <Form />
      </CardContent>
    </div>
  
</template>
