import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import IAuthenticationHttpRepository from "../plugins/authentication.http.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { SignupInput, SignupOutput } from "./types/signup.type";
import IAuthenticationLocalRepository from "../plugins/authentication.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import AuthTokenUseCases from "@/modules/shared/authStorage/business/usecases/auth-token.usecases";
import UserNotRegisteredError from "../errors/user-not-registrated.error";

export default class TrySignUpUseCase  extends BaseUseCase<SignupInput, SignupOutput> {

    constructor(
        @inject(TYPES.AuthenticationLocalRepository)
        private readonly _localRepositry: IAuthenticationLocalRepository,

        @inject(TYPES.AuthenticationHttpRepository)
        private readonly _repository: IAuthenticationHttpRepository,

        @inject(SharedTYPES.AuthTokenUseCases)
        private readonly _authTokenUseCases: AuthTokenUseCases
    ){
        super();
    }

    public execute = async (input: SignupInput): Promise<SignupOutput> => {

        const registration = this._localRepositry.getRegistration().value;
        if (!registration) {
            return Result.failure(new UserNotRegisteredError());
        }

        const dto = registration.toRequestDTO();

        const result = await this._repository.signUp(dto);
        if (!result.hasData()) {
            return Result.failure(new UserNotRegisteredError());
        }

        const token = result.data;

        this._authTokenUseCases.store(token);

        return Result.success();
    }
}