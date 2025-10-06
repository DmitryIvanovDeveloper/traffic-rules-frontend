import CreateCustomModelDTO from '../../dtos/create-custom-model.dto';

import CustomModelAttribute from '../../entities/custom-model-attribute';
import CustomModelState from '../../entities/custom-model-state';

export interface CreateCustomModelInput {
    name: string;
    attributes: CustomModelAttribute[];
    states: CustomModelState[];
    projectId: string;
    isPublished?: boolean;
}

export interface CreateSimpleCustomModelInput {
    projectId: string;
}

export interface CreateCustomModelOutput {
    success: boolean;
    modelId?: string;
}
