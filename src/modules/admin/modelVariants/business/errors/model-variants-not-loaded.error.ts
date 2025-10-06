import { AppError } from "@/infrastructure/errors/app.error";

export default class ModelVariantsNotLoadedError extends AppError {
    constructor() {
        super("Model variants could not be loaded", "MODEL_VARIANTS_NOT_LOADED");
    }
}








