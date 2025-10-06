import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsLocalRepository from "../plugins/custom-models.local.repository.plugin";
import ICustomModelsHttpRepository from "../plugins/custom-models.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { SelectCustomModelInput, SelectCustomModelOutput } from "./types/select-custom-model.type";
import CustomModelNotFoundError from "../errors/custom-model-not-found.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import CustomModelSelectedEvent from "../events/custom-model-selected-event";

@injectable()
export default class SelectCustomModelUseCase extends BaseUseCase<SelectCustomModelInput, Result<SelectCustomModelOutput>> {

    constructor(
        @inject(TYPES.CustomModelsLocalRepository)
        private readonly _localRepository: ICustomModelsLocalRepository,

        @inject(TYPES.CustomModelsHttpRepository)
        private readonly _httpRepository: ICustomModelsHttpRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super()
    }

    public execute = async (input: SelectCustomModelInput): Promise<Result<SelectCustomModelOutput>> => {
        console.log('SelectCustomModelUseCase: execute called with modelId:', input.modelId);
        let result = this._localRepository.findCustomModelById(input.modelId);
        console.log('SelectCustomModelUseCase: findCustomModelById result:', result);
        
        if (!result.hasData()) {
            console.log('SelectCustomModelUseCase: model not found locally, loading by id...');
            const httpResult = await this._httpRepository.loadCustomModelById(input.modelId);
            if (!httpResult.hasData()) {
                return Result.failure<SelectCustomModelOutput>(new CustomModelNotFoundError());
            }
            this._localRepository.addCustomModel(httpResult.data);
            result = Result.success(httpResult.data);
        }

        const customModel = result.data;
        console.log('SelectCustomModelUseCase: found model:', customModel);
        this._localRepository.storeCustomModel(customModel);
        console.log('SelectCustomModelUseCase: stored model in local repository');

        try {
            await this._eventBus.publishAsync(new CustomModelSelectedEvent(input.modelId));
            console.log('SelectCustomModelUseCase: published CustomModelSelectedEvent');
        } catch (error) {
            console.error('SelectCustomModelUseCase: error publishing event:', error);
        }
        
        return Result.success({ success: true });
    }
}
