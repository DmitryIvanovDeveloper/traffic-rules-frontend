import { AppError } from '@/infrastructure/errors/app.error';

export default class CustomModelNotCreatedError extends AppError {
    constructor() {
        super('Custom model was not created', 'CUSTOM_MODEL_NOT_CREATED');
    }
}



