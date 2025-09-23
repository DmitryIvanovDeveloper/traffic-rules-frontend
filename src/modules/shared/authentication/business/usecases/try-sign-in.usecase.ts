import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import IAuthenticationHttpRepository from "../plugins/authentication.http.repository.plugin";
import LoginRequestDTO from "../dtos/login.dto";
import AuthTokenUseCases from "@/modules/shared/authStorage/business/usecases/auth-token.usecases";
import Result from "@/infrastructure/helpers/result";
import { LoginType } from "../entities/login";
import { SignInInput, SigninOutput } from "./types/login.type";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import IAuthenticationLocalRepository from "../plugins/authentication.local.repository.plugin";

export default class TrySignInUseCase extends BaseUseCase<SignInInput, SigninOutput> {

    constructor(
        @inject(TYPES.AuthenticationHttpRepository)
        private readonly _repository: IAuthenticationHttpRepository,

        @inject(TYPES.AuthenticationLocalRepository)
        private readonly _localRepository: IAuthenticationLocalRepository,

        @inject(SharedTYPES.AuthTokenUseCases)
        private readonly _authTokenUseCases: AuthTokenUseCases
    ){
        super()
    }

    public execute = async (input: SignInInput): Promise<SigninOutput> => {
        
        const login = this._localRepository.getLogin().value;
        if (!login) {
            return Result.failure();
        }
        var data = login.type === LoginType.Email 
            ? login.email 
            : login.phone
        ;
        
        const result = await this._repository.signIn(data, login.password);
        if (!result.hasData()) {
            return  Result.failure();
        }

        this._authTokenUseCases.store(result.data);
        return Result.success();
    }
}