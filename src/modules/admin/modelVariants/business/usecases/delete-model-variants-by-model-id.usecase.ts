import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsHttpRepository from "../plugins/model-variants.http.repository.plugin";
import IModelVariantsLocalRepository from "../plugins/model-variants.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { DeleteModelVariantsByModelIdInput, DeleteModelVariantsByModelIdOutput } from "./types/delete-model-variants-by-model-id.type";
import ModelVariantNotDeletedError from "../errors/model-variant-not-deleted.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ModelVariantDeletedEvent from "../events/model-variant-deleted-event";

@injectable()
export default class DeleteModelVariantsByModelIdUseCase extends BaseUseCase<DeleteModelVariantsByModelIdInput, Result<DeleteModelVariantsByModelIdOutput>> {

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

    public execute = async (input: DeleteModelVariantsByModelIdInput): Promise<Result<DeleteModelVariantsByModelIdOutput>> => {
        const result = await this._modelVariantsRepository.deleteModelVariantsByModelId(input.modelId);
        if (!result.isSuccess) {
            return Result.failure<DeleteModelVariantsByModelIdOutput>(new ModelVariantNotDeletedError());
        }

        // Удаляем все варианты для данной модели из локального репозитория
        this._localRepository.removeModelVariantsByModelId(input.modelId);

        await this._eventBus.publishAsync(new ModelVariantDeletedEvent(input.modelId));
        
        return Result.success({ success: true });
    }
}






