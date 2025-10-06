export interface LoadModelVariantsInput {
    modelId: string;
}

export interface LoadModelVariantsOutput {
    variants: Array<{
        id: string;
        customModelId: string;
        name: string;
        attributes: Array<{ key: string; value: string | number }>;
        states: Array<{ type: number; image: string | null; price: number }>;
        isPublished: boolean;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
}







