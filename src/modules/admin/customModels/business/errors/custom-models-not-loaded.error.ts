import { AppError } from '@/infrastructure/errors/app.error';

export default class CustomModelsNotLoadedError extends AppError {
    constructor() {
        super('Custom models were not loaded', 'CUSTOM_MODELS_NOT_LOADED');
    }
}










