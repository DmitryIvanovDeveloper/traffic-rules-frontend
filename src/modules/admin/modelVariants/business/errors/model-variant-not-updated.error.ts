import { AppError } from "@/infrastructure/errors/app.error";

export default class ModelVariantNotUpdatedError extends AppError {
    constructor() {
        super("Model variant could not be updated", "MODEL_VARIANT_NOT_UPDATED");
    }
}







