import { CustomModelAttributeApiData } from '../types/api.types';

export default class CustomModelAttribute {
    constructor(
        public readonly key: string,
        public readonly values: (string | number)[]
    ) {}

    public static toEntity(data: CustomModelAttributeApiData): CustomModelAttribute[] {
        return Object.entries(data).map(([key, values]) => 
            new CustomModelAttribute(key, values)
        );
    }

    public static toRequestDto(attribute: CustomModelAttribute): Record<string, (string | number)[]> {
        return {
            [attribute.key]: attribute.values
        };
    }

    public static fromObject(obj: Record<string, (string | number)[]>): CustomModelAttribute[] {
        return Object.entries(obj).map(([key, values]) => new CustomModelAttribute(key, values));
    }

    public static toObject(attributes: CustomModelAttribute[]): Record<string, (string | number)[]> {
        return attributes.reduce((acc, attr) => {
            acc[attr.key] = attr.values;
            return acc;
        }, {} as Record<string, (string | number)[]>);
    }
}
