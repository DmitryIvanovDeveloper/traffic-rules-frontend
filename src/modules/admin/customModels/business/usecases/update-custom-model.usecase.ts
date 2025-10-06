import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsHttpRepository from "../plugins/custom-models.http.repository.plugin";
import ICustomModelsLocalRepository from "../plugins/custom-models.local.repository.plugin";
import CustomModelAttribute from "../entities/custom-model-attribute";
import UpdateCustomModelDTO from "../dtos/update-custom-model.dto";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { UpdateCustomModelInput, UpdateCustomModelOutput } from "./types/update-custom-model.type";
import CustomModelNotUpdatedError from "../errors/custom-model-not-updated.error";
import CustomModelNameEmptyError from "../errors/custom-model-name-empty.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import CustomModelUpdatedEvent from "../events/custom-model-updated-event";
import { CustomModelValidator } from "../validators/custom-model.validator";

@injectable()
export default class UpdateCustomModelUseCase extends BaseUseCase<UpdateCustomModelInput, Result<UpdateCustomModelOutput>> {

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

    public execute = async (input: UpdateCustomModelInput): Promise<Result<UpdateCustomModelOutput>> => {
        // Валидация входных данных
        const validation = CustomModelValidator.validateUpdateInput(input);
        if (!validation.isValid) {
            // Возвращаем первую ошибку валидации
            const firstError = validation.errors[0];
            return Result.failure<UpdateCustomModelOutput>(new CustomModelNameEmptyError());
        }

        const dto = new UpdateCustomModelDTO(
            input.id,
            input.name,
            input.attributes,
            input.states,
            input.projectId,
            input.isPublished
        );

        const result = await this._customModelsRepository.updateCustomModel(dto);
        if (!result.hasData()) {
            return Result.failure<UpdateCustomModelOutput>(new CustomModelNotUpdatedError());
        }

        const customModel = result.data;
        this._localRepository.updateCustomModel(customModel);

        await this._eventBus.publishAsync(new CustomModelUpdatedEvent(customModel.id));
        
        return Result.success({ success: true });
    }
}
