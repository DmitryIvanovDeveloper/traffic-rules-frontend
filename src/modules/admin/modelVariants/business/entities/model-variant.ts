import ModelVariantAttribute from './model-variant-attribute';
import ModelVariantState from './model-variant-state';
import { ModelVariantApiResponse, ModelVariantApiRequest } from '../types/api.types';

export default class ModelVariant {
    constructor(
        public readonly id: string,
        public readonly customModelId: string,
        public readonly name: string,
        public readonly attributes: ModelVariantAttribute[],
        public readonly states: ModelVariantState[],
        public readonly isPublished: boolean,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    public static toEntity(data: ModelVariantApiResponse): ModelVariant {
        // Проверяем обязательные поля
        if (!data.id || !data.name || !data.custom_model) {
            throw new Error(`Invalid ModelVariant data: missing required fields. Data: ${JSON.stringify(data)}`);
        }

        console.log('ModelVariant.toEntity: received data:', JSON.stringify(data, null, 2));

        // Преобразуем массив объектов атрибутов в массив ModelVariantAttribute
        const attributes = data.attributes ? 
            data.attributes.flatMap((attrGroup) => 
                Object.entries(attrGroup).map(([key, value]) => 
                    new ModelVariantAttribute(key, value)
                )
            ) : [];

        // Преобразуем массив состояний в массив ModelVariantState
        const states = data.states ? 
            data.states.map((state) => new ModelVariantState(state.type, state.image, state.price)) : [];

        console.log('ModelVariant.toEntity: parsed states:', states);

        return new ModelVariant(
            data.id,
            data.custom_model,
            data.name,
            attributes,
            states,
            data.is_published || false,
            data.created_at ? new Date(data.created_at) : undefined,
            data.updated_at ? new Date(data.updated_at) : undefined
        );
    }

    public static toRequestDto(variant: ModelVariant): ModelVariantApiRequest {
        // Группируем атрибуты в объект как ожидает API
        const attributesGrouped = variant.attributes.reduce((acc, attr) => {
            acc[attr.key] = attr.value;
            return acc;
        }, {} as Record<string, string | number>);

        return {
            id: variant.id,
            custom_model: variant.customModelId,
            name: variant.name,
            attributes: [attributesGrouped], // API ожидает массив объектов
            states: variant.states.map(state => ({
                type: state.type,
                image: state.image,
                price: state.price
            })),
            is_published: variant.isPublished
        };
    }

    public withUpdatedName(name: string): ModelVariant {
        return new ModelVariant(
            this.id,
            this.customModelId,
            name,
            this.attributes,
            this.states,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withUpdatedAttributes(attributes: ModelVariantAttribute[]): ModelVariant {
        return new ModelVariant(
            this.id,
            this.customModelId,
            this.name,
            attributes,
            this.states,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withUpdatedStates(states: ModelVariantState[]): ModelVariant {
        return new ModelVariant(
            this.id,
            this.customModelId,
            this.name,
            this.attributes,
            states,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withUpdatedPublished(isPublished: boolean): ModelVariant {
        return new ModelVariant(
            this.id,
            this.customModelId,
            this.name,
            this.attributes,
            this.states,
            isPublished,
            this.createdAt,
            new Date()
        );
    }
}
