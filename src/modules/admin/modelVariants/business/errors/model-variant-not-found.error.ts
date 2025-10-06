import { AppError } from "@/infrastructure/errors/app.error";

export default class ModelVariantNotFoundError extends AppError {
    constructor() {
        super("Model variant not found", "MODEL_VARIANT_NOT_FOUND");
    }
}








