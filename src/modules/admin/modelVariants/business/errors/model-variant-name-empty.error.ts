import { AppError } from "@/infrastructure/errors/app.error";

export default class ModelVariantNameEmptyError extends AppError {
    constructor() {
        super("Model variant name cannot be empty", "MODEL_VARIANT_NAME_EMPTY");
    }
}







