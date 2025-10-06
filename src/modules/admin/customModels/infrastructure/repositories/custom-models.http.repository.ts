import { inject, injectable } from 'inversify';
import { TYPES as SharedTYPES } from '@/infrastructure/bootstrap/types';
import IHttpClient from '@/infrastructure/api/http/http.interface';
import ICustomModelsHttpRepository from '../../business/plugins/custom-models.http.repository.plugin';
import CustomModel from '../../business/entities/custom-model';
import CreateCustomModelDTO from '../../business/dtos/create-custom-model.dto';
import UpdateCustomModelDTO from '../../business/dtos/update-custom-model.dto';
import LoadCustomModelsDTO from '../../business/dtos/load-custom-models.dto';
import { CustomModelApiResponse, CreateCustomModelApiRequest, UpdateCustomModelApiRequest } from '../../business/types/api.types';
import { safeParseCustomModel, safeParseCustomModelArray } from '../../business/types/runtime.types';
import Result from '@/infrastructure/helpers/result';

@injectable()
export default class CustomModelsHttpRepository implements ICustomModelsHttpRepository {
    
    constructor(
        @inject(SharedTYPES.HttpClient)
        private readonly _httpClient: IHttpClient
    ) {}

    async createCustomModel(dto: CreateCustomModelDTO): Promise<Result<CustomModel>> {
        try {
            const requestDto: CreateCustomModelApiRequest = CreateCustomModelDTO.toRequestDto(dto);
            const result = await this._httpClient.post<CustomModelApiResponse, CreateCustomModelApiRequest>('cards/admin/models/', requestDto);
            
            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            // Безопасный парсинг ответа
            const safeParseResult = safeParseCustomModel(result.data);
            if (!safeParseResult.hasData()) {
                return Result.failure(new Error('Invalid API response format') as any);
            }

            const model = CustomModel.toEntity(safeParseResult.data as any);
            return Result.success(model);
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async updateCustomModel(dto: UpdateCustomModelDTO): Promise<Result<CustomModel>> {
        try {
            const requestDto: UpdateCustomModelApiRequest = UpdateCustomModelDTO.toRequestDto(dto);
            const result = await this._httpClient.put<CustomModelApiResponse, UpdateCustomModelApiRequest>(`cards/admin/models/${dto.id}/`, requestDto);
            
            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            // Безопасный парсинг ответа
            const safeParseResult = safeParseCustomModel(result.data);
            if (!safeParseResult.hasData()) {
                return Result.failure(new Error('Invalid API response format') as any);
            }

            const model = CustomModel.toEntity(safeParseResult.data as any);
            return Result.success(model);
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async deleteCustomModel(id: string): Promise<Result<void>> {
        try {
            const result = await this._httpClient.delete<void>(`cards/admin/models/${id}/`);
            return result;
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async deleteCustomModelsByProjectId(projectId: string): Promise<Result<void>> {
        try {
            const result = await this._httpClient.delete<void>(`cards/admin/models/?project_id=${projectId}`);
            return result;
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async loadCustomModels(dto: LoadCustomModelsDTO): Promise<Result<CustomModel[]>> {
        try {
            console.log('HTTP Repository: Loading models for project:', dto.projectId);
            const result = await this._httpClient.get<CustomModelApiResponse[]>(`cards/admin/models/?project_id=${dto.projectId}`);
            console.log('HTTP Repository: Response received:', result);
            
            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            // Безопасный парсинг массива ответов
            const safeParseResult = safeParseCustomModelArray(result.data);
            if (!safeParseResult.hasData()) {
                return Result.failure(new Error('Invalid API response format') as any);
            }

            const models = safeParseResult.data.map(model => CustomModel.toEntity(model as any));
            return Result.success(models);
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async loadCustomModelById(id: string): Promise<Result<CustomModel>> {
        try {
            const result = await this._httpClient.get<CustomModelApiResponse>(`cards/admin/models/${id}/`);

            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            const safeParseResult = safeParseCustomModel(result.data);
            if (!safeParseResult.hasData()) {
                return Result.failure(new Error('Invalid API response format') as any);
            }

            const model = CustomModel.toEntity(safeParseResult.data as any);
            return Result.success(model);
        } catch (error) {
            return Result.failure(error as any);
        }
    }
}
