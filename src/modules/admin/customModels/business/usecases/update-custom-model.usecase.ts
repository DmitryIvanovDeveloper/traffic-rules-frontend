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
        console.log('🔄 USECASE: execute вызван с input:', input);
        console.log('  input.id:', input.id);
        console.log('  input.name:', input.name, 'length:', input.name?.length);
        console.log('  input.attributes:', input.attributes);
        console.log('  input.states:', input.states);
        console.log('  input.projectId:', input.projectId);
        console.log('  input.isPublished:', input.isPublished);
        
        // Валидация входных данных
        console.log('🔍 Запускаем валидацию...');
        const validation = CustomModelValidator.validateUpdateInput(input);
        console.log('📋 Результат валидации:', validation);
        
        if (!validation.isValid) {
            console.log('❌ Валидация провалена! Ошибки:', validation.errors);
            
            // Возвращаем первую ошибку валидации с правильным типом
            const firstError = validation.errors[0];
            console.log('🔍 Первая ошибка валидации:', firstError);
            
            // Возвращаем общую ошибку валидации вместо конкретной
            return Result.failure<UpdateCustomModelOutput>(
                new Error(`Validation failed: ${firstError.message} (field: ${firstError.field})`)
            );
        }
        
        console.log('✅ Валидация прошла успешно');

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
