import IHttpClient from '@/infrastructure/api/http/http.interface';
import Result from '@/infrastructure/helpers/result';
import CustomModel from '../entities/custom-model';
import CreateCustomModelDTO from '../dtos/create-custom-model.dto';
import UpdateCustomModelDTO from '../dtos/update-custom-model.dto';
import LoadCustomModelsDTO from '../dtos/load-custom-models.dto';

export default interface ICustomModelsHttpRepository {
    createCustomModel(dto: CreateCustomModelDTO): Promise<Result<CustomModel>>;
    updateCustomModel(dto: UpdateCustomModelDTO): Promise<Result<CustomModel>>;
    deleteCustomModel(id: string): Promise<Result<void>>;
    deleteCustomModelsByProjectId(projectId: string): Promise<Result<void>>;
    loadCustomModels(dto: LoadCustomModelsDTO): Promise<Result<CustomModel[]>>;
    loadCustomModelById(id: string): Promise<Result<CustomModel>>;
}




