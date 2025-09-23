import Result from "@/infrastructure/helpers/result";

export interface IAuthStorageRepository {
    storeToken(token: string): void;
    getToken(): Result<string>
    clearToken(): void;
    isAuthenticated(): boolean;
}
