<script setup lang="ts">
import RegistrationPresenter from "../../../presenter/registration.presenter";
import { TYPES } from "../../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import RegistrationController from "../../../controller/registration.controller";
import { RegistrationType } from "../../../../business/dtos/registration-type";
import { useRouter } from "vue-router";
import { RouterPaths } from "@/app/router/router-paths";

const presenter = container.get<RegistrationPresenter>(
  TYPES.RegistrationPresenter
);

const controller = container.get<RegistrationController>(
  TYPES.RegistrationController
);

const router = useRouter();

const signup = async (): Promise<void> => {
  const result = await controller.trySignUp();
  if (!result.isSuccess) {
    return;
  }

  router.push(RouterPaths.admin);
}



</script>

<template>
  <div class="flex w-full flex flex-col gap-[10px] pt-[20px]">
    <UniversalInput
        v-if="presenter.registrationViewModel.value?.type === RegistrationType.Business"
        :label="presenter.labels.company.label"
        :onChange="() => {}"
        :required="presenter.labels.company.required"
        :placeholder="presenter.labels.company.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.name.label"
        :onChange="(value) => controller.updateName(value as string)"
        :required="presenter.labels.name.required"
        :placeholder="presenter.labels.name.placeholder"
    />
    <UniversalInput
        :label="presenter.labels.lastName.label"
        :onChange="(value) => controller.updateLastName(value as string)"
        :required="presenter.labels.lastName.required"
        :placeholder="presenter.labels.lastName.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.email.label"
        :onChange="(value) => controller.updateEmail(value as string)"
        :required="presenter.labels.email.required"
        :placeholder="presenter.labels.email.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.phone.label"
         :onChange="(value) => controller.updatePhone(value as string)"
        :required="presenter.labels.phone.required"
        :placeholder="presenter.labels.phone.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.password.label"
        :onChange="(value) => controller.updatePassword(value as string)"
        :required="presenter.labels.password.required"
        :placeholder="presenter.labels.password.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.confirmPassword.label"
        :onChange="(value) => controller.updateConfirmPassword(value as string)"
        :required="presenter.labels.confirmPassword.required"
        :placeholder="presenter.labels.confirmPassword.placeholder"
    />

    <!-- Terms checkbox -->
    <div class="mb-4 flex items-center">
      <input
        id="terms"
        type="checkbox"
        class="mr-2"
      />
      <label for="terms" class="text-sm text-gray-600">
        Я принимаю
        <a href="#" class="text-purple-500">Условия использования</a> и
        <a href="#" class="text-purple-500">Политику конфиденциальности</a>
      </label>
    </div>

    <UniversalRoundedButton
        :loading="controller.isLoading.value"
        :label="'Зарегистрироваться'"
        :handle-press="signup"
    />

    <p class="text-sm text-gray-600 text-left">
      {{ presenter.labels.registeredAlready.title }}
      <router-link to="/login" class="text-purple-500">
        {{ presenter.labels.registeredAlready.goto }}
      </router-link>
    </p>
    
  </div>
</template>
