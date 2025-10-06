import ModelVariantAttribute from '../entities/model-variant-attribute';
import ModelVariantState  from '../entities/model-variant-state';

export default class CreateModelVariantDTO {
    constructor(
        public readonly customModelId: string,
        public readonly name: string,
        public readonly attributes: ModelVariantAttribute[],
        public readonly states: ModelVariantState[],
        public readonly isPublished: boolean = false
    ) {}

    public static toRequestDto(dto: CreateModelVariantDTO): any {
        return {
            custom_model: dto.customModelId,
            name: dto.name,
            attributes: dto.attributes.map(attr => ModelVariantAttribute.toRequestDto(attr)),
            states: dto.states.map(state => ModelVariantState.toRequestDto(state)),
            is_published: dto.isPublished
        };
    }
}



