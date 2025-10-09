import { AppError } from '@/infrastructure/errors/app.error';

export default class CustomModelNotDeletedError extends AppError {
    constructor() {
        super('Custom model was not deleted', 'CUSTOM_MODEL_NOT_DELETED');
    }
}









