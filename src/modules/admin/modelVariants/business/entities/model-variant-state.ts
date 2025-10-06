import { ModelVariantStateApiData } from '../types/api.types';

export default class ModelVariantState {
    constructor(
        public readonly type: number, // 1 - целая, 2 - поцарапанная, 3 - ломаная, 4 - разрушенная
        public readonly image: string | null, // base64 изображение
        public readonly price: number
    ) {}

    public static toEntity(data: ModelVariantStateApiData): ModelVariantState {
        return new ModelVariantState(
            data.type,
            data.image,
            data.price
        );
    }

    public static toRequestDto(state: ModelVariantState): ModelVariantStateApiData {
        return {
            type: state.type,
            image: state.image,
            price: state.price
        };
    }
}
