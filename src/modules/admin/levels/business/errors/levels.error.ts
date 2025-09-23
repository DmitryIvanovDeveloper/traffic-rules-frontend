import { AppError } from '@/infrastructure/errors/app.error';

export default class LevelsError extends AppError {
    constructor(message: string) {
        super(message, 'LEVELS_ERROR');
    }
}
