import { AppError } from "@/infrastructure/errors/app.error";

export default class ModelVariantNotCreatedError extends AppError {
    constructor() {
        super("Model variant could not be created", "MODEL_VARIANT_NOT_CREATED");
    }
}








