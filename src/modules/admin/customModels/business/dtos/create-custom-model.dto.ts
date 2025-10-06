import CustomModelAttribute from '../entities/custom-model-attribute';
import CustomModelState from '../entities/custom-model-state';
import { CreateCustomModelApiRequest } from '../types/api.types';

export default class CreateCustomModelDTO {
    constructor(
        public readonly name: string,
        public readonly attributes: CustomModelAttribute[],
        public readonly states: CustomModelState[],
        public readonly projectId: string,
        public readonly isPublished: boolean = false
    ) {}

    public static toRequestDto(dto: CreateCustomModelDTO): CreateCustomModelApiRequest {
        return {
            name: dto.name,
            attributes: dto.attributes.map(attr => CustomModelAttribute.toRequestDto(attr)),
            states: dto.states.map(state => CustomModelState.toRequestDto(state)),
            project_id: dto.projectId,
            is_published: dto.isPublished
        };
    }
}
