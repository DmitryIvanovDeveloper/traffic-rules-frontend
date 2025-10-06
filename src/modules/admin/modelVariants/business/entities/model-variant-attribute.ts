import { ModelVariantAttributeApiData } from '../types/api.types';

export default class ModelVariantAttribute {
    constructor(
        public readonly key: string,
        public readonly value: string | number
    ) {}

    public static toEntity(data: ModelVariantAttributeApiData): ModelVariantAttribute[] {
        return Object.entries(data).map(([key, value]) => 
            new ModelVariantAttribute(key, value)
        );
    }

    public static toRequestDto(attribute: ModelVariantAttribute): Record<string, string | number> {
        return {
            [attribute.key]: attribute.value
        };
    }

    public static fromObject(obj: Record<string, string | number>): ModelVariantAttribute[] {
        return Object.entries(obj).map(([key, value]) => new ModelVariantAttribute(key, value));
    }

    public static toObject(attributes: ModelVariantAttribute[]): Record<string, string | number> {
        return attributes.reduce((acc, attr) => {
            acc[attr.key] = attr.value;
            return acc;
        }, {} as Record<string, string | number>);
    }
}
