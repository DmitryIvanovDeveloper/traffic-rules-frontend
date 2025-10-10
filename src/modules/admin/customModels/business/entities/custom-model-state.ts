import { CustomModelStateApiData } from '../types/api.types';

export default class CustomModelState {
    constructor(
        public readonly type: number, // 5 - целая, 6 - поцарапанная, 7 - ломаная, 8 - разрушенная
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
        const types: Record<number, string> = {
            5: 'Целая модель',
            6: 'Поцарапанная модель',
            7: 'Ломаная модель',
            8: 'Разрушенная модель'
        };
        return types[this.type] || 'Неизвестный тип';
    }

    public getDamageTypeClass(): string {
        const classes: Record<number, string> = {
            5: 'bg-green-100 text-green-800',
            6: 'bg-yellow-100 text-yellow-800',
            7: 'bg-orange-100 text-orange-800',
            8: 'bg-red-100 text-red-800'
        };
        return classes[this.type] || 'bg-gray-100 text-gray-800';
    }
}

