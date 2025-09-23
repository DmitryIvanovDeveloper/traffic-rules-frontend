<script setup lang="ts">
import { TYPES } from "../../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import LoginPresenter from "../../../presenter/login.presenter";
import LoginController from "../../../controller/login.controller";
import { RouterPaths } from "@/app/router/router-paths";
import { LoginType } from "@/modules/shared/authentication/business/entities/login";

const presenter = container.get<LoginPresenter>(TYPES.LoginPresenter);

const controller = container.get<LoginController>(TYPES.LoginController);

const router = useRouter();

const signIn = async () => {
    const result = await controller.tryLogin();
    if (!result.isSuccess) {
        return;
    }
    router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.list}`);
}
</script>

<template>
  <div class="flex w-full flex flex-col gap-[10px] pt-[20px]">
    <UniversalInput
      v-if="presenter.loginVewModel.value?.type === LoginType.Email"
      :label="presenter.labels.email.label"
      :onChange="(value) => controller.updateEmail(value as string)"
      type="email"
    />

    <UniversalInput
      v-if="presenter.loginVewModel.value?.type === LoginType.Phone"
      :label="presenter.labels.phone.label"
      :onChange="(value) => controller.updatePhone(value as string)"
      type="phone"
    />

    <UniversalInput
      :label="presenter.labels.password.label"
      :onChange="(value) => controller.updatePassword(value as string)"
      type="password"
    />

    <UniversalRoundedButton
        :loading="controller.isLoading.value"
        :label="presenter.labels.confirm"
        :handle-press="signIn"
    />

    <p class="text-center text-sm text-gray-600 text-left">
      {{ presenter.labels.notRegistered.title }}
      <router-link to="/registration" class="text-purple-500">
        {{ presenter.labels.notRegistered.goto }}
      </router-link>
    </p>
  </div>
</template>
