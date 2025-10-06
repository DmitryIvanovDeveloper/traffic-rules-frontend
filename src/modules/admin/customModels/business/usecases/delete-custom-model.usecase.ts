import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsHttpRepository from "../plugins/custom-models.http.repository.plugin";
import ICustomModelsLocalRepository from "../plugins/custom-models.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { DeleteCustomModelInput, DeleteCustomModelOutput } from "./types/delete-custom-model.type";
import CustomModelNotDeletedError from "../errors/custom-model-not-deleted.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import CustomModelDeletedEvent from "../events/custom-model-deleted-event";

@injectable()
export default class DeleteCustomModelUseCase extends BaseUseCase<DeleteCustomModelInput, Result<DeleteCustomModelOutput>> {

    constructor(
        @inject(TYPES.CustomModelsHttpRepository)
        private readonly _customModelsRepository: ICustomModelsHttpRepository,

        @inject(TYPES.CustomModelsLocalRepository)
        private readonly _localRepository: ICustomModelsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super()
    }

    public execute = async (input: DeleteCustomModelInput): Promise<Result<DeleteCustomModelOutput>> => {
        const result = await this._customModelsRepository.deleteCustomModel(input.id);
        if (!result.isSuccess) {
            return Result.failure<DeleteCustomModelOutput>(new CustomModelNotDeletedError());
        }

        this._localRepository.removeCustomModel(input.id);

        await this._eventBus.publishAsync(new CustomModelDeletedEvent(input.id));
        
        return Result.success({ success: true });
    }
}
