import { ref, Ref } from 'vue';
import ModelVariant from '../entities/model-variant';
import Result from '@/infrastructure/helpers/result';

export default interface IModelVariantsLocalRepository {
    getModelVariants(): Ref<ModelVariant[]>;
    getModelVariant(): Ref<ModelVariant | null>;
    addModelVariant(variant: ModelVariant): void;
    updateModelVariant(variant: ModelVariant): void;
    removeModelVariant(id: string): void;
    clearModelVariants(): void;
    setModelVariants(variants: ModelVariant[]): void;
    findModelVariantById(id: string): Result<ModelVariant>;
    findModelVariantsByModelId(modelId: string): ModelVariant[];
    removeModelVariantsByModelId(modelId: string): void;
    storeModelVariant(variant: ModelVariant): void;
    clearSelectedModelVariant(): void;
}
