import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsHttpRepository from "../plugins/model-variants.http.repository.plugin";
import IModelVariantsLocalRepository from "../plugins/model-variants.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { DeleteModelVariantInput, DeleteModelVariantOutput } from "./types/delete-model-variant.type";
import ModelVariantNotDeletedError from "../errors/model-variant-not-deleted.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ModelVariantDeletedEvent from "../events/model-variant-deleted-event";

@injectable()
export default class DeleteModelVariantUseCase extends BaseUseCase<DeleteModelVariantInput, Result<DeleteModelVariantOutput>> {

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

    public execute = async (input: DeleteModelVariantInput): Promise<Result<DeleteModelVariantOutput>> => {
        const result = await this._modelVariantsRepository.deleteModelVariant(input.id);
        if (!result.isSuccess) {
            return Result.failure<DeleteModelVariantOutput>(new ModelVariantNotDeletedError());
        }

        this._localRepository.removeModelVariant(input.id);

        await this._eventBus.publishAsync(new ModelVariantDeletedEvent(input.id));
        
        return Result.success({ success: true });
    }
}








