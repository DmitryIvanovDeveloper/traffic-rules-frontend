import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsHttpRepository from "../plugins/model-variants.http.repository.plugin";
import IModelVariantsLocalRepository from "../plugins/model-variants.local.repository.plugin";
import ModelVariantAttribute from "../entities/model-variant-attribute";
import ModelVariantState from "../entities/model-variant-state";
import CreateModelVariantDTO from "../dtos/create-model-variant.dto";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateModelVariantInput, CreateModelVariantOutput } from "./types/create-model-variant.type";
import ModelVariantNotCreatedError from "../errors/model-variant-not-created.error";
import ModelVariantNameEmptyError from "../errors/model-variant-name-empty.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ModelVariantCreatedEvent from "../events/model-variant-created-event";

@injectable()
export default class CreateModelVariantUseCase extends BaseUseCase<CreateModelVariantInput, Result<CreateModelVariantOutput>> {

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

    public execute = async (input: CreateModelVariantInput): Promise<Result<CreateModelVariantOutput>> => {
        if (!input.name || input.name.trim() === '') {
            return Result.failure<CreateModelVariantOutput>(new ModelVariantNameEmptyError());
        }

        const attributes = input.attributes.map(attr => new ModelVariantAttribute(attr.key, attr.value));
        const states = input.states.map(state => new ModelVariantState(state.type, state.image, state.price));
        
        const dto = new CreateModelVariantDTO(
            input.customModelId,
            input.name,
            attributes,
            states,
            input.isPublished || false
        );

        const result = await this._modelVariantsRepository.createModelVariant(dto);
        if (!result.hasData()) {
            return Result.failure<CreateModelVariantOutput>(new ModelVariantNotCreatedError());
        }

        const modelVariant = result.data;
        this._localRepository.addModelVariant(modelVariant);

        await this._eventBus.publishAsync(new ModelVariantCreatedEvent(modelVariant.id));
        
        return Result.success({ success: true, variantId: modelVariant.id });
    }
}







