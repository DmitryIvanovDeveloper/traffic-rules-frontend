import { injectable } from 'inversify';
import { ref, Ref } from 'vue';
import IDamageTypesLocalRepository from '../../business/plugins/damage-types.local.repository.plugin';
import DamageType from '../../business/entities/damage-type';
import Result from '@/infrastructure/helpers/result';

@injectable()
export default class DamageTypesLocalRepository implements IDamageTypesLocalRepository {
    
    private readonly _damageTypes = ref<DamageType[]>([]);
    private readonly _selectedDamageType = ref<DamageType | null>(null);

    getDamageTypes(): Ref<DamageType[]> {
        return this._damageTypes;
    }

    getDamageType(): Ref<DamageType | null> {
        return this._selectedDamageType;
    }

    addDamageType(damageType: DamageType): void {
        const existingIndex = this._damageTypes.value.findIndex(dt => dt.id === damageType.id);
        if (existingIndex >= 0) {
            this._damageTypes.value[existingIndex] = damageType;
        } else {
            this._damageTypes.value.push(damageType);
        }
    }

    addDamageTypes(damageTypes: DamageType[]): void {
        damageTypes.forEach(dt => this.addDamageType(dt));
    }

    removeDamageType(id: string): void {
        this._damageTypes.value = this._damageTypes.value.filter(dt => dt.id !== id);
        
        if (this._selectedDamageType.value?.id === id) {
            this._selectedDamageType.value = null;
        }
    }

    clearDamageTypes(): void {
        this._damageTypes.value = [];
        this._selectedDamageType.value = null;
    }

    findDamageTypeById(id: string): Result<DamageType> {
        const damageType = this._damageTypes.value.find(dt => dt.id === id);
        if (!damageType) {
            return Result.failure();
        }
        return Result.success(damageType);
    }
}









