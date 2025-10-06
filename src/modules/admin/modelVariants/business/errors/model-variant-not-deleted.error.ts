import { AppError } from "@/infrastructure/errors/app.error";

export default class ModelVariantNotDeletedError extends AppError {
    constructor() {
        super("Model variant could not be deleted", "MODEL_VARIANT_NOT_DELETED");
    }
}








