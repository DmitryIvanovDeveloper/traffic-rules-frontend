import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsLocalRepository from "../../business/plugins/model-variants.local.repository.plugin";
import { computed } from "vue";
import { TYPES as CustomModelsTYPES } from "@/modules/admin/customModels/types";
import CustomModelsPresenter from "@/modules/admin/customModels/presentation/presenter/custom-models.presenter";
import { container } from "@/infrastructure/bootstrap/inversify.config";

@injectable()
export default class ModelVariantsPresenter {
    
    constructor(
        @inject(TYPES.ModelVariantsLocalRepository)
        private readonly _repository: IModelVariantsLocalRepository,
    ) {}

    public readonly labels = {
        title: "Варианты моделей",
        create: "Создать вариант",
        edit: "Редактировать",
        delete: "Удалить",
        published: "Опубликовано",
        draft: "Черновик",
        noVariants: "Нет созданных вариантов",
        loading: "Загрузка вариантов...",
        attributes: "Атрибуты",
        states: "Состояния",
        price: "Цена",
        type: "Тип",
        image: "Изображение"
    };

    // Получаем все варианты из репозитория
    private readonly allModelVariants = computed(() => this._repository.getModelVariants().value);

    // Фильтруем варианты по выбранной модели
    public readonly modelVariants = computed(() => {
        const customModelsPresenter = container.get<CustomModelsPresenter>(CustomModelsTYPES.CustomModelsPresenter);
        const selectedModelId = customModelsPresenter.customModelViewModel.value?.id;
        
        if (!selectedModelId) {
            return [];
        }
        
        return this.allModelVariants.value.filter(v => v.customModelId === selectedModelId);
    });

    public readonly selectedModelVariant = computed(() => this._repository.getModelVariant().value);

    public readonly modelVariantsCount = computed(() => this.modelVariants.value.length);

    public readonly publishedVariantsCount = computed(() => 
        this.modelVariants.value.filter(v => v.isPublished).length
    );

    public readonly draftVariantsCount = computed(() => 
        this.modelVariants.value.filter(v => !v.isPublished).length
    );

    public readonly modelVariantsViewModel = computed(() => 
        this.modelVariants.value.map(variant => ({
            id: variant.id,
            name: variant.name,
            customModelId: variant.customModelId,
            isPublished: variant.isPublished,
            attributesCount: variant.attributes.length,
            statesCount: variant.states.length,
            createdAt: variant.createdAt,
            updatedAt: variant.updatedAt,
            attributes: variant.attributes.map(attr => ({
                key: attr.key,
                value: attr.value
            })),
            states: variant.states.map(state => ({
                type: state.type,
                image: state.image,
                price: state.price
            }))
        }))
    );

    public getModelVariantsByModelId(modelId: string) {
        return this._repository.findModelVariantsByModelId(modelId);
    }

    public getModelVariantById(id: string) {
        return this._repository.findModelVariantById(id);
    }
}





