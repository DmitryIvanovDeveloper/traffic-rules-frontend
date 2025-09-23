import Result from "@/infrastructure/helpers/result";
import TokenNotExistError from "../business/errors/profile-not-exist.error";
import { IAuthStorageRepository as IAuthStorageRepository } from "../business/plugins/auth-storage.interface";

export class CookieStorageRespository implements IAuthStorageRepository {
    private key = "auth_token";

    public storeToken(token: string): void {
        document.cookie = `${this.key}=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 дней
    }
    
    public getToken(): Result<string> {
        const match = document.cookie.match(new RegExp(`${this.key}=([^;]+)`));
        if (!match) {
            return Result.failure(new TokenNotExistError());
        }
        
        return Result.success(match[1]);
      }
    
    public clearToken(): void {
        document.cookie = `${this.key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }

    public isAuthenticated(): boolean {
        return !!this.getToken();
    }
}