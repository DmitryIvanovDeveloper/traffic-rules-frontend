import Result from '@/infrastructure/helpers/result';
import DamageType from '../entities/damage-type';
import CreateDamageTypesDTO from '../dtos/create-damage-types.dto';

export default interface IDamageTypesHttpRepository {
    createDamageTypes(dto: CreateDamageTypesDTO): Promise<Result<DamageType[]>>;
    deleteDamageType(id: string): Promise<Result<void>>;
    loadDamageTypes(): Promise<Result<DamageType[]>>;
}









