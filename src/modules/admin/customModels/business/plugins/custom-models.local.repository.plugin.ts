import { ref, Ref } from 'vue';
import CustomModel from '../entities/custom-model';
import Result from '@/infrastructure/helpers/result';

export default interface ICustomModelsLocalRepository {
    getCustomModels(): Ref<CustomModel[]>;
    getCustomModel(): Ref<CustomModel | null>;
    addCustomModel(model: CustomModel): void;
    updateCustomModel(model: CustomModel): void;
    removeCustomModel(id: string): void;
    clearCustomModels(): void;
    findCustomModelById(id: string): Result<CustomModel>;
    findCustomModelsByProjectId(projectId: string): CustomModel[];
    storeCustomModel(model: CustomModel): void;
    clearSelectedCustomModel(): void;
}
