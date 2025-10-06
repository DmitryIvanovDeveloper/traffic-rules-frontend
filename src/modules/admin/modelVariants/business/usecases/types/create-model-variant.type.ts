export interface CreateModelVariantInput {
    customModelId: string;
    name: string;
    attributes: Array<{ key: string; value: string | number }>;
    states: Array<{ type: number; image: string | null; price: number }>;
    isPublished?: boolean;
}

export interface CreateModelVariantOutput {
    success: boolean;
    variantId: string;
}








