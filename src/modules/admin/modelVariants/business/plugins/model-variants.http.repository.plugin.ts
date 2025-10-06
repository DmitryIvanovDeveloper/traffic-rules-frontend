import Result from '@/infrastructure/helpers/result';
import ModelVariant from '../entities/model-variant';
import CreateModelVariantDTO from '../dtos/create-model-variant.dto';
import UpdateModelVariantDTO from '../dtos/update-model-variant.dto';
import LoadModelVariantsDTO from '../dtos/load-model-variants.dto';

export default interface IModelVariantsHttpRepository {
    createModelVariant(dto: CreateModelVariantDTO): Promise<Result<ModelVariant>>;
    updateModelVariant(dto: UpdateModelVariantDTO): Promise<Result<ModelVariant>>;
    deleteModelVariant(id: string): Promise<Result<void>>;
    deleteModelVariantsByModelId(modelId: string): Promise<Result<void>>;
    loadModelVariants(dto: LoadModelVariantsDTO): Promise<Result<ModelVariant[]>>;
}
