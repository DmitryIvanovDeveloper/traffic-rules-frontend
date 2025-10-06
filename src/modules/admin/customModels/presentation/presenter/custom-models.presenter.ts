import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsLocalRepository from "../../business/plugins/custom-models.local.repository.plugin";
import { ref, computed } from "vue";
import CustomModel from "../../business/entities/custom-model";
import CustomModelViewModel from "../view/view-models/custom-model.view-model";

@injectable()
export default class CustomModelsPresenter {
    
    constructor(
        @inject(TYPES.CustomModelsLocalRepository)
        private readonly _repository: ICustomModelsLocalRepository,
    ) {}

    public readonly labels = {
        title: 'Модели'
    };

    public readonly customModelsViewModel = computed(() => this.presentViewModels());
    public readonly customModelViewModel = computed(() => this.presentViewModel());

    public readonly customModels = computed(() => this._repository.getCustomModels().value);
    public readonly selectedCustomModel = computed(() => this._repository.getCustomModel().value);
    
    public readonly publishedCustomModels = computed(() => 
        this.customModels.value.filter(model => model.isPublished)
    );
    
    public readonly unpublishedCustomModels = computed(() => 
        this.customModels.value.filter(model => !model.isPublished)
    );

    public readonly customModelsCount = computed(() => this.customModels.value.length);
    public readonly publishedCount = computed(() => this.publishedCustomModels.value.length);
    public readonly unpublishedCount = computed(() => this.unpublishedCustomModels.value.length);

    public findCustomModelById = (id: string): CustomModel | null => {
        return this.customModels.value.find(model => model.id === id) || null;
    };

    public findCustomModelsByProjectId = (projectId: string): CustomModel[] => {
        return this.customModels.value.filter(model => model.projectId === projectId);
    };

    public getCustomModelAttributes = (modelId: string): Array<{ key: string; values: (string | number)[] }> => {
        const model = this.findCustomModelById(modelId);
        if (!model) {
            return [];
        }
        
        return model.attributes.map(attr => ({
            key: attr.key,
            values: attr.values
        }));
    };

    public getCustomModelStates = (modelId: string): Array<{ type: number; image: string | null; price: number }> => {
        const model = this.findCustomModelById(modelId);
        if (!model) {
            return [];
        }
        
        return model.states.map(state => ({
            type: state.type,
            image: state.image,
            price: state.price
        }));
    };

    public getDamageTypeName = (type: number): string => {
        const types = ['', 'Целая модель', 'Поцарапанная модель', 'Ломаная модель', 'Разрушенная модель'];
        return types[type] || 'Неизвестный тип';
    };

    public getDamageTypeClass = (type: number): string => {
        const classes = [
            '', // 0 - не используется
            'bg-green-100 text-green-800', // 1 - целая
            'bg-yellow-100 text-yellow-800', // 2 - поцарапанная
            'bg-orange-100 text-orange-800', // 3 - ломаная
            'bg-red-100 text-red-800' // 4 - разрушенная
        ];
        return classes[type] || 'bg-gray-100 text-gray-800';
    };

    private presentViewModels(): Array<CustomModelViewModel> {
        const models = this._repository.getCustomModels().value;
        if (!models.length) {
            return [];
        }

        return models.map(model => new CustomModelViewModel(model));
    }

    private presentViewModel(): CustomModelViewModel | undefined {
        const model = this._repository.getCustomModel().value;
        console.log('CustomModelsPresenter: presentViewModel called, model:', model);
        if (!model) {
            console.log('CustomModelsPresenter: no model selected');
            return;
        }

        const viewModel = new CustomModelViewModel(model);
        console.log('CustomModelsPresenter: created viewModel:', viewModel);
        return viewModel;
    }
}
