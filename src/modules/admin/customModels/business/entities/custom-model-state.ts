import { CustomModelStateApiData } from '../types/api.types';

export default class CustomModelState {
    constructor(
        public readonly type: number, // 1 - целая, 2 - поцарапанная, 3 - ломаная, 4 - разрушенная
        public readonly image: string | null, // base64 изображение
        public readonly price: number
    ) {}

    public static toEntity(data: CustomModelStateApiData): CustomModelState {
        return new CustomModelState(
            data.type,
            data.image,
            data.price
        );
    }

    public static toRequestDto(state: CustomModelState): CustomModelStateApiData {
        return {
            type: state.type,
            image: state.image,
            price: state.price
        };
    }

    public withUpdatedType(type: number): CustomModelState {
        return new CustomModelState(type, this.image, this.price);
    }

    public withUpdatedImage(image: string | null): CustomModelState {
        return new CustomModelState(this.type, image, this.price);
    }

    public withUpdatedPrice(price: number): CustomModelState {
        return new CustomModelState(this.type, this.image, price);
    }

    public getDamageTypeName(): string {
        const types = ['', 'Целая модель', 'Поцарапанная модель', 'Ломаная модель', 'Разрушенная модель'];
        return types[this.type] || 'Неизвестный тип';
    }

    public getDamageTypeClass(): string {
        const classes = [
            '', // 0 - не используется
            'bg-green-100 text-green-800', // 1 - целая
            'bg-yellow-100 text-yellow-800', // 2 - поцарапанная
            'bg-orange-100 text-orange-800', // 3 - ломаная
            'bg-red-100 text-red-800' // 4 - разрушенная
        ];
        return classes[this.type] || 'bg-gray-100 text-gray-800';
    }
}

