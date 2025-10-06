import { injectable } from 'inversify';
import { ref, Ref } from 'vue';
import IModelVariantsLocalRepository from '../../business/plugins/model-variants.local.repository.plugin';
import ModelVariant from '../../business/entities/model-variant';
import Result from '@/infrastructure/helpers/result';

@injectable()
export default class ModelVariantsLocalRepository implements IModelVariantsLocalRepository {
    
    private readonly _modelVariants = ref<ModelVariant[]>([]);
    private readonly _selectedModelVariant = ref<ModelVariant | null>(null);

    getModelVariants(): Ref<ModelVariant[]> {
        return this._modelVariants;
    }

    getModelVariant(): Ref<ModelVariant | null> {
        return this._selectedModelVariant;
    }

    addModelVariant(variant: ModelVariant): void {
        const existingIndex = this._modelVariants.value.findIndex(v => v.id === variant.id);
        if (existingIndex >= 0) {
            this._modelVariants.value[existingIndex] = variant;
        } else {
            this._modelVariants.value.push(variant);
        }
    }

    updateModelVariant(variant: ModelVariant): void {
        const existingIndex = this._modelVariants.value.findIndex(v => v.id === variant.id);
        if (existingIndex >= 0) {
            this._modelVariants.value[existingIndex] = variant;
        }
        
        if (this._selectedModelVariant.value?.id === variant.id) {
            this._selectedModelVariant.value = variant;
        }
    }

    removeModelVariant(id: string): void {
        this._modelVariants.value = this._modelVariants.value.filter(v => v.id !== id);
        
        if (this._selectedModelVariant.value?.id === id) {
            this._selectedModelVariant.value = null;
        }
    }

    clearModelVariants(): void {
        this._modelVariants.value = [];
        this._selectedModelVariant.value = null;
    }

    findModelVariantById(id: string): Result<ModelVariant> {
        const variant = this._modelVariants.value.find(v => v.id === id);
        if (!variant) {
            return Result.failure();
        }
        return Result.success(variant);
    }

    findModelVariantsByModelId(modelId: string): ModelVariant[] {
        return this._modelVariants.value.filter(v => v.customModelId === modelId);
    }

    removeModelVariantsByModelId(modelId: string): void {
        this._modelVariants.value = this._modelVariants.value.filter(v => v.customModelId !== modelId);
    }

    setModelVariants(variants: ModelVariant[]): void {
        this._modelVariants.value = variants;
    }

    storeModelVariant(variant: ModelVariant): void {
        this._selectedModelVariant.value = variant;
    }

    clearSelectedModelVariant(): void {
        this._selectedModelVariant.value = null;
    }
}
