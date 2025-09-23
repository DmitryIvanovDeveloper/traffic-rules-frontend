import { AppError } from '@/infrastructure/errors/app.error';

export default class AchievementsError extends AppError {
    constructor(message: string) {
        super(message, 'ACHIEVEMENTS_ERROR');
    }
}
