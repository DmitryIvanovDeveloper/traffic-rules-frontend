import { AppError } from '@/infrastructure/errors/app.error';

export default class AuthenticationError extends AppError {
    constructor(message: string,) {
        super(message, 'AUTHENTICATION_ERROR');
    }
}
