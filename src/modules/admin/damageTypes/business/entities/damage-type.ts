import { DamageTypeApiResponse, DamageTypeApiData } from '../types/api.types';

export default class DamageType {
    constructor(
        public readonly id: string,
        public readonly langIso: string,
        public readonly name: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    public static toEntity(data: DamageTypeApiResponse): DamageType {
        // Проверяем обязательные поля
        if (!data.id || !data.name || !data.lang_iso) {
            throw new Error(`Invalid DamageType data: missing required fields. Data: ${JSON.stringify(data)}`);
        }

        return new DamageType(
            data.id,
            data.lang_iso,
            data.name,
            data.created_at ? new Date(data.created_at) : undefined,
            data.updated_at ? new Date(data.updated_at) : undefined
        );
    }

    public static toRequestDto(damageType: DamageType): DamageTypeApiData {
        return {
            id: damageType.id,
            lang_iso: damageType.langIso,
            name: damageType.name
        };
    }

    public withUpdatedName(name: string): DamageType {
        return new DamageType(
            this.id,
            this.langIso,
            name,
            this.createdAt,
            new Date()
        );
    }
}
