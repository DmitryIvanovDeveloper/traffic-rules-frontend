import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsHttpRepository from "../plugins/custom-models.http.repository.plugin";
import ICustomModelsLocalRepository from "../plugins/custom-models.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { CreateSimpleCustomModelInput, CreateCustomModelOutput } from "./types/create-custom-model.type";
import CustomModelNotCreatedError from "../errors/custom-model-not-created.error";
import CustomModel from "../entities/custom-model";
import CreateCustomModelDTO from "../dtos/create-custom-model.dto";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import CustomModelCreatedEvent from "../events/custom-model-created-event";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";

@injectable()
export default class CreateSimpleCustomModelUseCase extends BaseUseCase<CreateSimpleCustomModelInput, Result<CreateCustomModelOutput>> {

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

    public execute = async (input: CreateSimpleCustomModelInput): Promise<Result<CreateCustomModelOutput>> => {
        // Создаем DTO с дефолтными значениями
        const dto = new CreateCustomModelDTO(
            'Новая модель',
            [], // пустые атрибуты
            [], // пустые состояния
            input.projectId,
            false
        );

        const result = await this._customModelsRepository.createCustomModel(dto);
        if (!result.hasData()) {
            return Result.failure<CreateCustomModelOutput>(new CustomModelNotCreatedError());
        }

        const customModel = result.data;
        this._localRepository.addCustomModel(customModel);

        await this._eventBus.publishAsync(new CustomModelCreatedEvent(customModel.id));
        
        return Result.success<CreateCustomModelOutput>({ success: true, modelId: customModel.id });
    }
}
