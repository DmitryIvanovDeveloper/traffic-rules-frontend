import CustomModelAttribute from '../../entities/custom-model-attribute';
import CustomModelState from '../../entities/custom-model-state';

export interface UpdateCustomModelInput {
    id: string;
    name: string;
    attributes: CustomModelAttribute[];
    states: CustomModelState[];
    projectId: string;
    isPublished: boolean;
}

export interface UpdateCustomModelOutput {
    success: boolean;
}
