import { NAMES, TYPES } from "@/infrastructure/bootstrap/types";
import { IAuthStorageRepository } from "../plugins/auth-storage.interface";
import { inject, named } from "inversify";
import Result from "@/infrastructure/helpers/result";

export default class AuthTokenUseCases {

    constructor(
        @inject(TYPES.AuthStorageRepository)
        @named(NAMES.LocalStorageRespository)
        private readonly _localStorageRepository: IAuthStorageRepository,

        @inject(TYPES.AuthStorageRepository)
        @named(NAMES.SessionStorageRespository)
        private readonly _sessionStorageRespository: IAuthStorageRepository,

        @inject(TYPES.AuthStorageRepository)
        @named(NAMES.CookieStorageRespository)
        private readonly _cookieStorageRespository: IAuthStorageRepository,
    ) {}

    public store = (token: string): void => {
        this._localStorageRepository.storeToken(token);
    }

    public get = (): Result<string> => {
        return this._localStorageRepository.getToken();
    }

    public clear = (): void => {
        this._localStorageRepository.clearToken();
    }

    public isAuthenticated = (): boolean => {
        return this._localStorageRepository.isAuthenticated();
    }
}