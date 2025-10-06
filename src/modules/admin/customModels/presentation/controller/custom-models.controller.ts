import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import CreateCustomModelUseCase from "../../business/usecases/create-custom-model.usecase";
import CreateSimpleCustomModelUseCase from "../../business/usecases/create-simple-custom-model.usecase";
import UpdateCustomModelUseCase from "../../business/usecases/update-custom-model.usecase";
import DeleteCustomModelUseCase from "../../business/usecases/delete-custom-model.usecase";
import LoadCustomModelsUseCase from "../../business/usecases/load-custom-models.usecase";
import SelectCustomModelUseCase from "../../business/usecases/select-custom-model.usecase";
import ICustomModelsLocalRepository from "../../business/plugins/custom-models.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { ref } from "vue";
import CustomModelAttribute from "../../business/entities/custom-model-attribute";
import CustomModelState from "../../business/entities/custom-model-state";
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin";
import { TYPES as ProjectTYPES } from "@/modules/admin/projects/types";
import CustomModelNotCreatedError from "../../business/errors/custom-model-not-created.error";
import { CreateCustomModelOutput } from "../../business/usecases/types/create-custom-model.type";

@injectable()
export default class CustomModelsController {
    
    constructor(
        @inject(TYPES.CreateCustomModelUseCase)
        private readonly _createCustomModelUseCase: CreateCustomModelUseCase,

        @inject(TYPES.CreateSimpleCustomModelUseCase)
        private readonly _createSimpleCustomModelUseCase: CreateSimpleCustomModelUseCase,

        @inject(TYPES.UpdateCustomModelUseCase)
        private readonly _updateCustomModelUseCase: UpdateCustomModelUseCase,

        @inject(TYPES.DeleteCustomModelUseCase)
        private readonly _deleteCustomModelUseCase: DeleteCustomModelUseCase,

        @inject(TYPES.LoadCustomModelsUseCase)
        private readonly _loadCustomModelsUseCase: LoadCustomModelsUseCase,

        @inject(TYPES.SelectCustomModelUseCase)
        private readonly _selectCustomModelUseCase: SelectCustomModelUseCase,

        @inject(TYPES.CustomModelsLocalRepository)
        private readonly _repository: ICustomModelsLocalRepository,

        @inject(ProjectTYPES.ProjectsService)
        private readonly _projectsService: IProjectsService,
    ) {}

    public readonly loading = ref<boolean>(false);
    public readonly creating = ref<boolean>(false);
    public readonly updating = ref<boolean>(false);
    public readonly deleting = ref<boolean>(false);

    public createCustomModel = async (): Promise<Result<CreateCustomModelOutput>> => {
        const result = this._projectsService.getSelectedProjectId();
        if (!result.hasData()) {
            return Result.failure(new CustomModelNotCreatedError());
        }

        try {
            this.creating.value = true;
            return await this._createSimpleCustomModelUseCase.execute({ projectId: result.data });
        } 
        finally {
            this.creating.value = false;
        }
    };

    public createCustomModelWithData = async (name: string, attributes: Array<{ key: string; values: (string | number)[] }>, states: Array<{ type: number; image: string | null; price: number }>, projectId: string, isPublished: boolean = false): Promise<Result<any>> => {
        try {
            this.creating.value = true;
            
            const modelAttributes = attributes.map(attr => new CustomModelAttribute(attr.key, attr.values));
            const modelStates = states.map(state => new CustomModelState(state.type, state.image, state.price));
            
            return await this._createCustomModelUseCase.execute({
                name,
                attributes: modelAttributes,
                states: modelStates,
                projectId,
                isPublished
            });
        }
        finally {
            this.creating.value = false;
        }
    };

    public updateCustomModelWithData = async (id: string, name: string, attributes: Array<{ key: string; values: (string | number)[] }>, states: Array<{ type: number; image: string | null; price: number }>, projectId: string, isPublished: boolean): Promise<Result<any>> => {
        try {
            this.updating.value = true;
            
            const modelAttributes = attributes.map(attr => new CustomModelAttribute(attr.key, attr.values));
            const modelStates = states.map(state => new CustomModelState(state.type, state.image, state.price));
            
            return await this._updateCustomModelUseCase.execute({
                id,
                name,
                attributes: modelAttributes,
                states: modelStates,
                projectId,
                isPublished
            });
        }
        finally {
            this.updating.value = false;
        }
    };

    public deleteCustomModel = async (id: string): Promise<Result<any>> => {
        try {
            this.deleting.value = true;
            return await this._deleteCustomModelUseCase.execute({ id });
        }
        finally {
            this.deleting.value = false;
        }
    };

    public loadCustomModels = async (projectId: string): Promise<Result<any>> => {
        try {
            this.loading.value = true;
            return await this._loadCustomModelsUseCase.execute({ projectId });
        }
        finally {
            this.loading.value = false;
        }
    };

    public selectCustomModel = async (modelId: string): Promise<Result<any>> => {
        return await this._selectCustomModelUseCase.execute({ modelId });
    };

    public updateName = (id: string, name: string): void => {
        const result = this._repository.findCustomModelById(id);
        if (!result.hasData()) {
            return;
        }

        const model = result.data;
        const updatedModel = model.withUpdatedName(name);
        this._repository.updateCustomModel(updatedModel);
    };

    public updateAttributes = (id: string, attributes: Array<{ key: string; values: (string | number)[] }>): void => {
        const result = this._repository.findCustomModelById(id);
        if (!result.hasData()) {
            return;
        }

        const model = result.data;
        const modelAttributes = attributes.map(attr => new CustomModelAttribute(attr.key, attr.values));
        const updatedModel = model.withUpdatedAttributes(modelAttributes);
        this._repository.updateCustomModel(updatedModel);
    };

    public updateStates = (id: string, states: Array<{ type: number; image: string | null; price: number }>): void => {
        const result = this._repository.findCustomModelById(id);
        if (!result.hasData()) {
            return;
        }

        const model = result.data;
        const modelStates = states.map(state => new CustomModelState(state.type, state.image, state.price));
        const updatedModel = model.withUpdatedStates(modelStates);
        this._repository.updateCustomModel(updatedModel);
    };

    public addState = (id: string, state: { type: number; image: string | null; price: number }): void => {
        const result = this._repository.findCustomModelById(id);
        if (!result.hasData()) {
            return;
        }

        const model = result.data;
        const modelState = new CustomModelState(state.type, state.image, state.price);
        const updatedModel = model.withNewState(modelState);
        this._repository.updateCustomModel(updatedModel);
    };

    public removeState = (id: string, stateIndex: number): void => {
        const result = this._repository.findCustomModelById(id);
        if (!result.hasData()) {
            return;
        }

        const model = result.data;
        const updatedModel = model.withRemovedState(stateIndex);
        this._repository.updateCustomModel(updatedModel);
    };

    public updatePublished = (id: string, isPublished: boolean): void => {
        const result = this._repository.findCustomModelById(id);
        if (!result.hasData()) {
            return;
        }

        const model = result.data;
        const updatedModel = model.withUpdatedPublished(isPublished);
        this._repository.updateCustomModel(updatedModel);
    };

    public clearSelectedCustomModel = (): void => {
        this._repository.clearSelectedCustomModel();
    };
}
