import Result from "@/infrastructure/helpers/result";
import TokenNotExistError from "../business/errors/profile-not-exist.error";
import { IAuthStorageRepository as IAuthStorageRepository } from "../business/plugins/auth-storage.interface";

export class LocalStorageRespository implements IAuthStorageRepository {
    private key = "auth_token";

    storeToken(token: string): void {
        localStorage.setItem("auth_token", token);
    }
  
    public getToken(): Result<string> {
        const token = localStorage.getItem(this.key);
        if (!token) {
            return Result.failure(new TokenNotExistError());
        }

        return Result.success(token);
    }
  
    public clearToken(): void {
        localStorage.removeItem(this.key);
    }

    public isAuthenticated = (): boolean => {
        return !!localStorage.getItem(this.key);
    }
}