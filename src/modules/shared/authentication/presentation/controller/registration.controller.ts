import { ref } from "vue";
import { RegistrationType } from "../../business/dtos/registration-type";
import RegistrationRequestDTO from "../../business/dtos/registration.dto";
import { inject } from "inversify";
import { TYPES } from "../../types";
import TrySignUpUseCase from "../../business/usecases/try-sign-up.usecase";
import IAuthenticationLocalRepository from "../../business/plugins/authentication.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";

export default class RegistrationController {

    constructor(
        @inject(TYPES.TrySignUpUseCase)
        private readonly _trySignUpUseCase: TrySignUpUseCase,

        @inject(TYPES.AuthenticationLocalRepository)
        private readonly _authenticationLocalRepository: IAuthenticationLocalRepository
    ) {}
    
    public readonly isLoading = ref<boolean>(false);

    public updateCompany = (company: string) => {
        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }

        const updatedRegistraton = registration.updateWithCompany(company);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);
    }

    public updateName = (name: string) => {
        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }
        const updatedRegistraton = registration.updateWithName(name);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);

    }

    public updateLastName = (lastName: string) => {
        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }

        const updatedRegistraton = registration.updateWithLastName(lastName);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);
    }

    public updateEmail = (email: string) => {
        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }

        const updatedRegistraton = registration.updateWithEmail(email);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);
    }

    public updatePhone = (phone: string) => {
        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }

        const updatedRegistraton = registration.updateWithPhone(phone);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);
    }

    public updatePassword = (password: string) => {

        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }

        const updatedRegistraton = registration.updateWithPassword(password);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);
    }

    public updateConfirmPassword = (confirmPassword: string) => {

        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }

        const updatedRegistraton = registration.updateWithConfirmPassword(confirmPassword);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);
    }

    public updateType = (type: RegistrationType) => {

        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return;
        }
        const updatedRegistraton = registration.updateWithType(type);
        this._authenticationLocalRepository.storeRegistration(updatedRegistraton);
    }

    public trySignUp = async (): Promise<Result<void>> => {
        this.isLoading.value = true;
        const result = await this._trySignUpUseCase.execute({});
        this.isLoading.value = false;

        return result;
    }
}
