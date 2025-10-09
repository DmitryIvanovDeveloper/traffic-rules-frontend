import { AppError } from '@/infrastructure/errors/app.error';

export default class CustomModelNotUpdatedError extends AppError {
    constructor() {
        super('Custom model was not updated', 'CUSTOM_MODEL_NOT_UPDATED');
    }
}









