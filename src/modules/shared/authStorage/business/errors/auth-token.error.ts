import { AppError } from "@/infrastructure/errors/app.error";

export default class AuthTokenError extends AppError {
    constructor(message: string) {
        super(message, 'AUTH_TOKEN_ERROR');
    }
}
