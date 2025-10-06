import ModelVariantAttribute from '../entities/model-variant-attribute';
import ModelVariantState from '../entities/model-variant-state';
import { UpdateModelVariantApiRequest } from '../types/api.types';

export default class UpdateModelVariantDTO {
    constructor(
        public readonly id: string,
        public readonly customModelId: string,
        public readonly name: string,
        public readonly attributes: ModelVariantAttribute[],
        public readonly states: ModelVariantState[],
        public readonly isPublished: boolean
    ) {}

    public static toRequestDto(dto: UpdateModelVariantDTO): UpdateModelVariantApiRequest {
        return {
            // id не отправляем в body при PUT, он уже есть в URL
            custom_model: dto.customModelId,
            name: dto.name,
            attributes: dto.attributes.map(attr => ModelVariantAttribute.toRequestDto(attr)),
            states: dto.states.map(state => ModelVariantState.toRequestDto(state)),
            is_published: dto.isPublished
        };
    }
}





