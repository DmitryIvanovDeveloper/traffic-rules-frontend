import { ref, Ref } from 'vue';
import DamageType from '../entities/damage-type';
import Result from '@/infrastructure/helpers/result';

export default interface IDamageTypesLocalRepository {
    getDamageTypes(): Ref<DamageType[]>;
    getDamageType(): Ref<DamageType | null>;
    addDamageType(damageType: DamageType): void;
    addDamageTypes(damageTypes: DamageType[]): void;
    removeDamageType(id: string): void;
    clearDamageTypes(): void;
    findDamageTypeById(id: string): Result<DamageType>;
}







