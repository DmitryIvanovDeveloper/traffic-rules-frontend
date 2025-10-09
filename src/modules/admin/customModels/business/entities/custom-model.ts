import CustomModelAttribute from './custom-model-attribute.js';
import CustomModelState from './custom-model-state';
import { CustomModelApiResponse, CustomModelApiRequest, CreateCustomModelApiRequest } from '../types/api.types';

export default class CustomModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly attributes: CustomModelAttribute[],
        public readonly states: CustomModelState[], // Используется только в UI для временного хранения. API не поддерживает это поле.
        public readonly projectId: string,
        public readonly isPublished: boolean,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    public static toEntity(data: CustomModelApiResponse): CustomModel {
        // Проверяем обязательные поля
        if (!data.id || !data.name || !data.project_id) {
            throw new Error(`Invalid CustomModel data: missing required fields. Data: ${JSON.stringify(data)}`);
        }

        // Преобразуем массив объектов атрибутов в массив CustomModelAttribute
        const attributes = data.attributes ? 
            data.attributes.flatMap((attrGroup) => 
                Object.entries(attrGroup).map(([key, values]) => 
                    new CustomModelAttribute(key, values)
                )
            ) : [];

        // Преобразуем массив состояний в массив CustomModelState
        const states = data.states ? 
            data.states.map((state) => new CustomModelState(state.type, state.image, state.price)) : [];

        return new CustomModel(
            data.id,
            data.name,
            attributes,
            states,
            data.project_id,
            data.is_published || false,
            data.created_at ? new Date(data.created_at) : undefined,
            data.updated_at ? new Date(data.updated_at) : undefined
        );
    }

    public static toRequestDto(model: CustomModel): CustomModelApiRequest {
        // Группируем атрибуты в объект как ожидает API
        const attributesGrouped = model.attributes.reduce((acc, attr) => {
            acc[attr.key] = attr.values;
            return acc;
        }, {} as Record<string, (string | number)[]>);

        // Преобразуем состояния в формат API
        const statesData = model.states.map(state => CustomModelState.toRequestDto(state));

        return {
            id: model.id,
            name: model.name,
            attributes: [attributesGrouped], // API ожидает массив объектов
            states: statesData,
            project_id: model.projectId,
            is_published: model.isPublished
        };
    }

    public withUpdatedName(name: string): CustomModel {
        return new CustomModel(
            this.id,
            name,
            this.attributes,
            this.states,
            this.projectId,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withUpdatedStates(states: CustomModelState[]): CustomModel {
        return new CustomModel(
            this.id,
            this.name,
            this.attributes,
            states,
            this.projectId,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withNewState(state: CustomModelState): CustomModel {
        return new CustomModel(
            this.id,
            this.name,
            this.attributes,
            [...this.states, state],
            this.projectId,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withRemovedState(stateIndex: number): CustomModel {
        const updatedStates = this.states.filter((_, index) => index !== stateIndex);
        return new CustomModel(
            this.id,
            this.name,
            this.attributes,
            updatedStates,
            this.projectId,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withUpdatedAttributes(attributes: CustomModelAttribute[]): CustomModel {
        return new CustomModel(
            this.id,
            this.name,
            attributes,
            this.states,
            this.projectId,
            this.isPublished,
            this.createdAt,
            new Date()
        );
    }

    public withUpdatedPublished(isPublished: boolean): CustomModel {
        return new CustomModel(
            this.id,
            this.name,
            this.attributes,
            this.states,
            this.projectId,
            isPublished,
            this.createdAt,
            new Date()
        );
    }

    public static toCreateRequest(projectId: string): CreateCustomModelApiRequest {
        return {
            name: 'Новая модель',
            attributes: [],
            states: [],
            project_id: projectId,
            is_published: false
        };
    }
}
