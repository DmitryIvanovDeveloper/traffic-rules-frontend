import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import CreateModelVariantUseCase from "../../business/usecases/create-model-variant.usecase";
import UpdateModelVariantUseCase from "../../business/usecases/update-model-variant.usecase";
import DeleteModelVariantUseCase from "../../business/usecases/delete-model-variant.usecase";
import DeleteModelVariantsByModelIdUseCase from "../../business/usecases/delete-model-variants-by-model-id.usecase";
import LoadModelVariantsUseCase from "../../business/usecases/load-model-variants.usecase";
import SelectModelVariantUseCase from "../../business/usecases/select-model-variant.usecase";
import IModelVariantsLocalRepository from "../../business/plugins/model-variants.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { ref } from "vue";
import ModelVariantAttribute from "../../business/entities/model-variant-attribute";
import ModelVariantState from "../../business/entities/model-variant-state";

@injectable()
export default class ModelVariantsController {
    
    constructor(
        @inject(TYPES.CreateModelVariantUseCase)
        private readonly _createModelVariantUseCase: CreateModelVariantUseCase,

        @inject(TYPES.UpdateModelVariantUseCase)
        private readonly _updateModelVariantUseCase: UpdateModelVariantUseCase,

        @inject(TYPES.DeleteModelVariantUseCase)
        private readonly _deleteModelVariantUseCase: DeleteModelVariantUseCase,

        @inject(TYPES.DeleteModelVariantsByModelIdUseCase)
        private readonly _deleteModelVariantsByModelIdUseCase: DeleteModelVariantsByModelIdUseCase,

        @inject(TYPES.LoadModelVariantsUseCase)
        private readonly _loadModelVariantsUseCase: LoadModelVariantsUseCase,

        @inject(TYPES.SelectModelVariantUseCase)
        private readonly _selectModelVariantUseCase: SelectModelVariantUseCase,

        @inject(TYPES.ModelVariantsLocalRepository)
        private readonly _repository: IModelVariantsLocalRepository,
    ) {}

    public readonly loading = ref<boolean>(false);
    public readonly creating = ref<boolean>(false);
    public readonly updating = ref<boolean>(false);
    public readonly deleting = ref<boolean>(false);

    public createModelVariant = async (
        customModelId: string, 
        name: string, 
        attributes: Array<{ key: string; value: string | number }>, 
        states: Array<{ type: number; image: string | null; price: number }>, 
        isPublished: boolean = false
    ): Promise<Result<any>> => {
        try {
            this.creating.value = true;
            return await this._createModelVariantUseCase.execute({
                customModelId,
                name,
                attributes,
                states,
                isPublished
            });
        }
        finally {
            this.creating.value = false;
        }
    };

    public updateModelVariant = async (
        id: string, 
        customModelId: string, 
        name: string, 
        attributes: Array<{ key: string; value: string | number }>, 
        states: Array<{ type: number; image: string | null; price: number }>, 
        isPublished: boolean
    ): Promise<Result<any>> => {
        try {
            this.updating.value = true;
            return await this._updateModelVariantUseCase.execute({
                id,
                customModelId,
                name,
                attributes,
                states,
                isPublished
            });
        }
        finally {
            this.updating.value = false;
        }
    };

    public deleteModelVariant = async (id: string): Promise<Result<any>> => {
        try {
            this.deleting.value = true;
            return await this._deleteModelVariantUseCase.execute({ id });
        }
        finally {
            this.deleting.value = false;
        }
    };

    public loadModelVariants = async (modelId: string): Promise<Result<any>> => {
        try {
            this.loading.value = true;
            return await this._loadModelVariantsUseCase.execute({ modelId });
        }
        finally {
            this.loading.value = false;
        }
    };

    public selectModelVariant = async (variantId: string): Promise<Result<any>> => {
        return await this._selectModelVariantUseCase.execute({ variantId });
    };

    public deleteModelVariantsByModelId = async (modelId: string): Promise<Result<any>> => {
        try {
            this.deleting.value = true;
            return await this._deleteModelVariantsByModelIdUseCase.execute({ modelId });
        }
        finally {
            this.deleting.value = false;
        }
    };

    public updateName = (id: string, name: string): void => {
        const result = this._repository.findModelVariantById(id);
        if (!result.hasData()) {
            return;
        }

        const variant = result.data;
        const updatedVariant = variant.withUpdatedName(name);
        this._repository.updateModelVariant(updatedVariant);
    };

    public updateAttributes = (id: string, attributes: Array<{ key: string; value: string | number }>): void => {
        const result = this._repository.findModelVariantById(id);
        if (!result.hasData()) {
            return;
        }

        const variant = result.data;
        const modelAttributes = attributes.map(attr => new ModelVariantAttribute(attr.key, attr.value));
        const updatedVariant = variant.withUpdatedAttributes(modelAttributes);
        this._repository.updateModelVariant(updatedVariant);
    };

    public updateStates = (id: string, states: Array<{ type: number; image: string | null; price: number }>): void => {
        const result = this._repository.findModelVariantById(id);
        if (!result.hasData()) {
            return;
        }

        const variant = result.data;
        const modelStates = states.map(state => new ModelVariantState(state.type, state.image, state.price));
        const updatedVariant = variant.withUpdatedStates(modelStates);
        this._repository.updateModelVariant(updatedVariant);
    };

    public updatePublished = (id: string, isPublished: boolean): void => {
        const result = this._repository.findModelVariantById(id);
        if (!result.hasData()) {
            return;
        }

        const variant = result.data;
        const updatedVariant = variant.withUpdatedPublished(isPublished);
        this._repository.updateModelVariant(updatedVariant);
    };
}

