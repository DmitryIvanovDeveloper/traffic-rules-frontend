import { inject, injectable } from 'inversify';
import { TYPES as SharedTYPES } from '@/infrastructure/bootstrap/types';
import IHttpClient from '@/infrastructure/api/http/http.interface';
import IModelVariantsHttpRepository from '../../business/plugins/model-variants.http.repository.plugin';
import ModelVariant from '../../business/entities/model-variant';
import CreateModelVariantDTO from '../../business/dtos/create-model-variant.dto';
import UpdateModelVariantDTO from '../../business/dtos/update-model-variant.dto';
import LoadModelVariantsDTO from '../../business/dtos/load-model-variants.dto';
import { ModelVariantApiResponse, CreateModelVariantApiRequest, UpdateModelVariantApiRequest } from '../../business/types/api.types';
import Result from '@/infrastructure/helpers/result';

@injectable()
export default class ModelVariantsHttpRepository implements IModelVariantsHttpRepository {
    
    constructor(
        @inject(SharedTYPES.HttpClient)
        private readonly _httpClient: IHttpClient
    ) {}

    async createModelVariant(dto: CreateModelVariantDTO): Promise<Result<ModelVariant>> {
        try {
            const requestDto: CreateModelVariantApiRequest = CreateModelVariantDTO.toRequestDto(dto);
            const result = await this._httpClient.post<ModelVariantApiResponse, CreateModelVariantApiRequest>('cards/admin/model_variants/', requestDto);
            
            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            const variant = ModelVariant.toEntity(result.data);
            return Result.success(variant);
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async updateModelVariant(dto: UpdateModelVariantDTO): Promise<Result<ModelVariant>> {
        try {
            const requestDto: UpdateModelVariantApiRequest = UpdateModelVariantDTO.toRequestDto(dto);
            const result = await this._httpClient.put<ModelVariantApiResponse, UpdateModelVariantApiRequest>(`cards/admin/model_variants/${dto.id}/`, requestDto);
            
            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            const variant = ModelVariant.toEntity(result.data);
            return Result.success(variant);
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async deleteModelVariant(id: string): Promise<Result<void>> {
        try {
            const result = await this._httpClient.delete<void>(`cards/admin/model_variants/${id}/`);
            return result;
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async deleteModelVariantsByModelId(modelId: string): Promise<Result<void>> {
        try {
            const result = await this._httpClient.delete<void>(`cards/admin/model_variants/?model_id=${modelId}`);
            return result;
        } catch (error) {
            return Result.failure(error as any);
        }
    }

    async loadModelVariants(dto: LoadModelVariantsDTO): Promise<Result<ModelVariant[]>> {
        try {
            console.log('ModelVariantsHttpRepository: loading variants for model:', dto.modelId);
            const result = await this._httpClient.get<ModelVariantApiResponse[]>(`cards/admin/model_variants/?model_id=${dto.modelId}`);
            
            if (!result.hasData()) {
                console.log('ModelVariantsHttpRepository: no data received');
                return Result.failure(result.errors);
            }

            console.log('ModelVariantsHttpRepository: received data:', JSON.stringify(result.data, null, 2));
            const variants = result.data.map(variant => ModelVariant.toEntity(variant));
            console.log('ModelVariantsHttpRepository: parsed variants:', variants);
            return Result.success(variants);
        } catch (error) {
            console.error('ModelVariantsHttpRepository: error loading variants:', error);
            return Result.failure(error as any);
        }
    }
}
