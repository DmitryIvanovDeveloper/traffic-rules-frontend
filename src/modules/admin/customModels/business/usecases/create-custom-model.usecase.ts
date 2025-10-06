import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsHttpRepository from "../plugins/custom-models.http.repository.plugin";
import ICustomModelsLocalRepository from "../plugins/custom-models.local.repository.plugin";
import CustomModel from "../entities/custom-model";
import CustomModelAttribute from "../entities/custom-model-attribute";
import CreateCustomModelDTO from "../dtos/create-custom-model.dto";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateCustomModelInput, CreateCustomModelOutput } from "./types/create-custom-model.type";
import CustomModelNotCreatedError from "../errors/custom-model-not-created.error";
import CustomModelNameEmptyError from "../errors/custom-model-name-empty.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import CustomModelCreatedEvent from "../events/custom-model-created-event";
import { CustomModelValidator } from "../validators/custom-model.validator";

@injectable()
export default class CreateCustomModelUseCase extends BaseUseCase<CreateCustomModelInput, Result<CreateCustomModelOutput>> {

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

    public execute = async (input: CreateCustomModelInput): Promise<Result<CreateCustomModelOutput>> => {
        // Валидация входных данных
        const validation = CustomModelValidator.validateCreateInput(input);
        if (!validation.isValid) {
            // Возвращаем первую ошибку валидации
            const firstError = validation.errors[0];
            return Result.failure<CreateCustomModelOutput>(new CustomModelNameEmptyError());
        }

        const dto = new CreateCustomModelDTO(
            input.name,
            input.attributes,
            input.states,
            input.projectId,
            input.isPublished || false
        );

        const result = await this._customModelsRepository.createCustomModel(dto);
        if (!result.hasData()) {
            return Result.failure<CreateCustomModelOutput>(new CustomModelNotCreatedError());
        }

        const customModel = result.data;
        this._localRepository.addCustomModel(customModel);

        await this._eventBus.publishAsync(new CustomModelCreatedEvent(customModel.id));
        
        return Result.success({ success: true, modelId: customModel.id });
    }
}
