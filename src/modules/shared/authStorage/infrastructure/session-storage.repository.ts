import Result from "@/infrastructure/helpers/result";
import TokenNotExistError from "../business/errors/profile-not-exist.error";
import { IAuthStorageRepository as IAuthStorageRepository } from "../business/plugins/auth-storage.interface";

export class SessionStorageRespository implements IAuthStorageRepository {
    private key = "auth_token";

    storeToken(token: string) {
        sessionStorage.setItem(this.key, token);
    }
  
    getToken(): Result<string> {
        const token = sessionStorage.getItem(this.key);
        if (!token) {
            return Result.failure(new TokenNotExistError());
        }

        return Result.success(token);
    }
  
    clearToken() {
        sessionStorage.removeItem(this.key);
    }

    public isAuthenticated = (): boolean => {
        return !!sessionStorage.getItem(this.key);
    }
  }