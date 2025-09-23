import { ref } from "vue";
import { inject } from "inversify";
import { TYPES } from "../../types";
import TrySignInUseCase from "../../business/usecases/try-sign-in.usecase";
import Result from "@/infrastructure/helpers/result";
import IAuthenticationLocalRepository from "../../business/plugins/authentication.local.repository.plugin";
import { LoginType } from "../../business/entities/login";

export default class LoginController {

    constructor(
        @inject(TYPES.TrySignInUseCase)
        private readonly _trySignInUseCase: TrySignInUseCase,

        @inject(TYPES.AuthenticationLocalRepository)
        private readonly _repository: IAuthenticationLocalRepository
    ) {}


    public readonly isLoading = ref<boolean>(false);

    public updateEmail = (email: string): void => {
        const login = this._repository.getLogin().value;
         if (!login) {
              return;
         }


        const updatedLogin = login.updateWithEmail(email);
        this._repository.storeLogin(updatedLogin);
    }

    public updatePhone = (phone: string): void => {
        const login = this._repository.getLogin().value;
         if (!login) {
              return;
         }

        const updatedLogin = login.updateWithPhone(phone);
        this._repository.storeLogin(updatedLogin);
    }

    public updatePassword = (password: string): void => {
        const login = this._repository.getLogin().value;
         if (!login) {
              return;
         }

        const updatedLogin = login.updateWithPassword(password);
        this._repository.storeLogin(updatedLogin);
    }

   
    public updateType = (type: LoginType): void => {
        const login = this._repository.getLogin().value;
         if (!login) {
              return;
         }

        const updatedLogin = login.updateWithType(type);
        this._repository.storeLogin(updatedLogin);
    }

    public tryLogin = async (): Promise<Result<void>> => {
        this.isLoading.value = true;
        const result = await this._trySignInUseCase.execute({});
        this.isLoading.value = false;

        return result;
    }
}
