import { inject, injectable } from 'inversify';
import { TYPES as SharedTYPES } from '@/infrastructure/bootstrap/types';
import IHttpClient from '@/infrastructure/api/http/http.interface';
import IDamageTypesHttpRepository from '../../business/plugins/damage-types.http.repository.plugin';
import DamageType from '../../business/entities/damage-type';
import CreateDamageTypesDTO from '../../business/dtos/create-damage-types.dto';
import Result from '@/infrastructure/helpers/result';
import { AppError } from '@/infrastructure/errors/app.error';
import { DamageTypeApiResponse, CreateDamageTypesApiRequest } from '../../business/types/api.types';

@injectable()
export default class DamageTypesHttpRepository implements IDamageTypesHttpRepository {
    
    constructor(
        @inject(SharedTYPES.HttpClient)
        private readonly _httpClient: IHttpClient
    ) {}

    async createDamageTypes(dto: CreateDamageTypesDTO): Promise<Result<DamageType[]>> {
        try {
            const requestDto = CreateDamageTypesDTO.toRequestDto(dto);
            const result = await this._httpClient.post<DamageTypeApiResponse[], CreateDamageTypesApiRequest>(
                '/cards/admin/damage_types/',
                requestDto as CreateDamageTypesApiRequest
            );
            
            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            const damageTypes = result.data.map(dt => DamageType.toEntity(dt));
            return Result.success(damageTypes);
        } catch (error) {
            const appError = error instanceof AppError
                ? error
                : new AppError((error as Error)?.message ?? String(error), 'UNKNOWN');
            return Result.failure(appError);
        }
    }

    async deleteDamageType(id: string): Promise<Result<void>> {
        try {
            const result = await this._httpClient.delete<void>(`/cards/admin/damage_types/${id}/`);
            return result;
        } catch (error) {
            const appError = error instanceof AppError
                ? error
                : new AppError((error as Error)?.message ?? String(error), 'UNKNOWN');
            return Result.failure(appError);
        }
    }

    async loadDamageTypes(): Promise<Result<DamageType[]>> {
        try {
            const result = await this._httpClient.get<DamageTypeApiResponse[]>('/cards/admin/damage_types/');
            
            if (!result.hasData()) {
                return Result.failure(result.errors);
            }

            const damageTypes = result.data.map(dt => DamageType.toEntity(dt));
            return Result.success(damageTypes);
        } catch (error) {
            const appError = error instanceof AppError
                ? error
                : new AppError((error as Error)?.message ?? String(error), 'UNKNOWN');
            return Result.failure(appError);
        }
    }
}




