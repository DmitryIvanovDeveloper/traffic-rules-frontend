import { AppError } from '@/infrastructure/errors/app.error';

export default class CustomModelNotFoundError extends AppError {
    constructor() {
        super('Custom model was not found', 'CUSTOM_MODEL_NOT_FOUND');
    }
}








