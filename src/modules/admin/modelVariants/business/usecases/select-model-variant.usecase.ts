import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsLocalRepository from "../plugins/model-variants.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { SelectModelVariantInput, SelectModelVariantOutput } from "./types/select-model-variant.type";
import ModelVariantNotFoundError from "../errors/model-variant-not-found.error";

@injectable()
export default class SelectModelVariantUseCase extends BaseUseCase<SelectModelVariantInput, Result<SelectModelVariantOutput>> {

    constructor(
        @inject(TYPES.ModelVariantsLocalRepository)
        private readonly _localRepository: IModelVariantsLocalRepository,
    ) {
        super()
    }

    public execute = async (input: SelectModelVariantInput): Promise<Result<SelectModelVariantOutput>> => {
        console.log('SelectModelVariantUseCase: Selecting variant with id:', input.variantId);
        const result = this._localRepository.findModelVariantById(input.variantId);
        
        if (!result.hasData()) {
            console.error('SelectModelVariantUseCase: Variant not found');
            return Result.failure<SelectModelVariantOutput>(new ModelVariantNotFoundError());
        }

        const variant = result.data;
        console.log('SelectModelVariantUseCase: Found variant:', variant);
        
        // Сохраняем выбранный вариант в локальный репозиторий
        this._localRepository.storeModelVariant(variant);
        console.log('SelectModelVariantUseCase: Variant stored in local repository');
        
        const variantOutput = {
            id: variant.id,
            customModelId: variant.customModelId,
            name: variant.name,
            attributes: variant.attributes.map(attr => ({ key: attr.key, value: attr.value })),
            states: variant.states.map(state => ({ type: state.type, image: state.image, price: state.price })),
            isPublished: variant.isPublished,
            createdAt: variant.createdAt,
            updatedAt: variant.updatedAt
        };

        return Result.success({ variant: variantOutput });
    }
}





