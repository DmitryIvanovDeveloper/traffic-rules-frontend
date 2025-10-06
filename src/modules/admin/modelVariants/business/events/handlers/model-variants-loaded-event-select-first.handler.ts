import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import ModelVariantsLoadedEvent from "../model-variants-loaded-event";
import SelectModelVariantUseCase from "../../usecases/select-model-variant.usecase";

export default class ModelVariantsLoadedEventSelectFirstHandler implements ISyncEventHandler<ModelVariantsLoadedEvent> {

    constructor(
        @inject(TYPES.SelectModelVariantUseCase)
        private readonly _selectModelVariantUseCase: SelectModelVariantUseCase
    ) {}

    public canHandle(event: ModelVariantsLoadedEvent): boolean {
        return event instanceof ModelVariantsLoadedEvent;
    }

    public handle(event: ModelVariantsLoadedEvent): void {
        if (!event.variants?.length) return;
        const first = event.variants[0];
        this._selectModelVariantUseCase.execute({ variantId: first.id });
    }
}




