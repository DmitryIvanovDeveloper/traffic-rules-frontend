import { AppError } from '@/infrastructure/errors/app.error';

export default class CustomModelNameEmptyError extends AppError {
    constructor() {
        super('Custom model name cannot be empty', 'CUSTOM_MODEL_NAME_EMPTY');
    }
}







