import { injectable } from 'inversify';
import { ref, Ref } from 'vue';
import ICustomModelsLocalRepository from '../../business/plugins/custom-models.local.repository.plugin';
import CustomModel from '../../business/entities/custom-model';
import Result from '@/infrastructure/helpers/result';

@injectable()
export default class CustomModelsLocalRepository implements ICustomModelsLocalRepository {
    
    private readonly _customModels = ref<CustomModel[]>([]);
    private readonly _selectedCustomModel = ref<CustomModel | null>(null);

    getCustomModels(): Ref<CustomModel[]> {
        return this._customModels;
    }

    getCustomModel(): Ref<CustomModel | null> {
        return this._selectedCustomModel;
    }

    addCustomModel(model: CustomModel): void {
        const existingIndex = this._customModels.value.findIndex(m => m.id === model.id);
        if (existingIndex >= 0) {
            this._customModels.value[existingIndex] = model;
        } else {
            this._customModels.value.push(model);
        }
    }

    updateCustomModel(model: CustomModel): void {
        const existingIndex = this._customModels.value.findIndex(m => m.id === model.id);
        if (existingIndex >= 0) {
            this._customModels.value[existingIndex] = model;
        }
        
        if (this._selectedCustomModel.value?.id === model.id) {
            this._selectedCustomModel.value = model;
        }
    }

    removeCustomModel(id: string): void {
        this._customModels.value = this._customModels.value.filter(m => m.id !== id);
        
        if (this._selectedCustomModel.value?.id === id) {
            this._selectedCustomModel.value = null;
        }
    }

    clearCustomModels(): void {
        this._customModels.value = [];
        this._selectedCustomModel.value = null;
    }

    findCustomModelById(id: string): Result<CustomModel> {
        const model = this._customModels.value.find(m => m.id === id);
        if (!model) {
            return Result.failure();
        }
        return Result.success(model);
    }

    findCustomModelsByProjectId(projectId: string): CustomModel[] {
        return this._customModels.value.filter(m => m.projectId === projectId);
    }

    storeCustomModel(model: CustomModel): void {
        this._selectedCustomModel.value = model;
    }

    clearSelectedCustomModel(): void {
        this._selectedCustomModel.value = null;
    }
}
