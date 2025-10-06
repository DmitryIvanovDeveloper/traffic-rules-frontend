import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsHttpRepository from "../plugins/model-variants.http.repository.plugin";
import IModelVariantsLocalRepository from "../plugins/model-variants.local.repository.plugin";
import ModelVariantAttribute from "../entities/model-variant-attribute";
import ModelVariantState from "../entities/model-variant-state";
import UpdateModelVariantDTO from "../dtos/update-model-variant.dto";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { UpdateModelVariantInput, UpdateModelVariantOutput } from "./types/update-model-variant.type";
import ModelVariantNotUpdatedError from "../errors/model-variant-not-updated.error";
import ModelVariantNameEmptyError from "../errors/model-variant-name-empty.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ModelVariantUpdatedEvent from "../events/model-variant-updated-event";

@injectable()
export default class UpdateModelVariantUseCase extends BaseUseCase<UpdateModelVariantInput, Result<UpdateModelVariantOutput>> {

    constructor(
        @inject(TYPES.ModelVariantsHttpRepository)
        private readonly _modelVariantsRepository: IModelVariantsHttpRepository,

        @inject(TYPES.ModelVariantsLocalRepository)
        private readonly _localRepository: IModelVariantsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super()
    }

    public execute = async (input: UpdateModelVariantInput): Promise<Result<UpdateModelVariantOutput>> => {
        if (!input.name || input.name.trim() === '') {
            return Result.failure<UpdateModelVariantOutput>(new ModelVariantNameEmptyError());
        }

        const attributes = input.attributes.map(attr => new ModelVariantAttribute(attr.key, attr.value));
        const states = input.states.map(state => new ModelVariantState(state.type, state.image, state.price));
        
        const dto = new UpdateModelVariantDTO(
            input.id,
            input.customModelId,
            input.name,
            attributes,
            states,
            input.isPublished
        );

        const result = await this._modelVariantsRepository.updateModelVariant(dto);
        if (!result.hasData()) {
            return Result.failure<UpdateModelVariantOutput>(new ModelVariantNotUpdatedError());
        }

        const modelVariant = result.data;
        this._localRepository.updateModelVariant(modelVariant);

        await this._eventBus.publishAsync(new ModelVariantUpdatedEvent(modelVariant.id));
        
        return Result.success({ success: true });
    }
}








