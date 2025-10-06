import CustomModel from "../../../business/entities/custom-model";

export default class CustomModelViewModel {
    readonly id: string;
    readonly name: string;
    readonly attributes: Array<{ key: string; values: (string | number)[] }>;
    readonly states: Array<{ type: number; image: string | null; price: number }>;
    readonly projectId: string;
    readonly isPublished: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly edited: boolean;
    readonly deleting: boolean;
    readonly hasError?: boolean;
    readonly published?: boolean;

    constructor(entity: CustomModel) {
        this.id = entity.id;
        this.name = entity.name;
        this.attributes = entity.attributes.map(attr => ({
            key: attr.key,
            values: attr.values
        }));
        this.states = entity.states.map(state => ({
            type: state.type,
            image: state.image,
            price: state.price
        }));
        this.projectId = entity.projectId;
        this.isPublished = entity.isPublished;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
        this.edited = false; // Можно добавить логику для определения редактирования
        this.deleting = false; // Можно добавить логику для определения удаления
        this.hasError = false; // Можно добавить логику для определения ошибок
        this.published = entity.isPublished;
    }
}








