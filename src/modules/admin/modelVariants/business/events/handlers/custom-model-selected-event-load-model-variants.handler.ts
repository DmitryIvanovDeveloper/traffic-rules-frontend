import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import CustomModelSelectedEvent from "@/modules/admin/customModels/business/events/custom-model-selected-event";
import { inject } from "inversify";
import LoadModelVariantsUseCase from "../../usecases/load-model-variants.usecase";
import { TYPES } from "../../../types";

export default class CustomModelSelectedEventLoadModelVariantsHandler implements IAsyncEventHandler<CustomModelSelectedEvent> {

    constructor(
        @inject(TYPES.LoadModelVariantsUseCase)
        private readonly _loadModelVariantsUseCase: LoadModelVariantsUseCase
    ) {}

    public canHandle(event: CustomModelSelectedEvent): boolean {
        return event instanceof CustomModelSelectedEvent;
    }

    public async handleAsync(event: CustomModelSelectedEvent): Promise<void> {
        console.log('CustomModelSelectedEventLoadModelVariantsHandler: Loading variants for model:', event.modelId);
        await this._loadModelVariantsUseCase.execute({ modelId: event.modelId });
        console.log('CustomModelSelectedEventLoadModelVariantsHandler: Variants loaded successfully');
    }
}

