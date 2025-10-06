import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsHttpRepository from "../plugins/model-variants.http.repository.plugin";
import IModelVariantsLocalRepository from "../plugins/model-variants.local.repository.plugin";
import LoadModelVariantsDTO from "../dtos/load-model-variants.dto";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadModelVariantsInput, LoadModelVariantsOutput } from "./types/load-model-variants.type";
import ModelVariantsNotLoadedError from "../errors/model-variants-not-loaded.error";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import ModelVariantsLoadedEvent from "../events/model-variants-loaded-event";

@injectable()
export default class LoadModelVariantsUseCase {

    constructor(
        @inject(TYPES.ModelVariantsHttpRepository)
        private readonly _modelVariantsRepository: IModelVariantsHttpRepository,

        @inject(TYPES.ModelVariantsLocalRepository)
        private readonly _localRepository: IModelVariantsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,
    ) {
    }

    public execute = async (input: LoadModelVariantsInput): Promise<Result<LoadModelVariantsOutput>> => {
        console.log('LoadModelVariantsUseCase: Loading variants for modelId:', input.modelId);
        const dto = new LoadModelVariantsDTO(input.modelId);
        const result = await this._modelVariantsRepository.loadModelVariants(dto);
        
        if (!result.hasData()) {
            console.error('LoadModelVariantsUseCase: Failed to load variants');
            return Result.failure<LoadModelVariantsOutput>(new ModelVariantsNotLoadedError());
        }

        const variants = result.data;
        console.log('LoadModelVariantsUseCase: Loaded', variants.length, 'variants');
        console.log('LoadModelVariantsUseCase: Variants data:', variants);
        
        // Сохраняем в локальный репозиторий
        this._localRepository.setModelVariants(variants);
        console.log('LoadModelVariantsUseCase: Variants saved to local repository');

        const variantsOutput = variants.map(variant => ({
            id: variant.id,
            customModelId: variant.customModelId,
            name: variant.name,
            attributes: variant.attributes.map(attr => ({ key: attr.key, value: attr.value })),
            states: variant.states.map(state => ({ type: state.type, image: state.image, price: state.price })),
            isPublished: variant.isPublished,
            createdAt: variant.createdAt,
            updatedAt: variant.updatedAt
        }));

        console.log('LoadModelVariantsUseCase: Returning', variantsOutput.length, 'variants with states');

        // Публикуем событие о загрузке вариантов, чтобы авто-выбрать первый
        try {
            const payload = variants.map(v => ({ id: v.id, name: v.name }));
            this._eventBus.publish(new ModelVariantsLoadedEvent(payload));
        } catch (e) {
            console.warn('LoadModelVariantsUseCase: failed to publish ModelVariantsLoadedEvent', e);
        }

        return Result.success({ variants: variantsOutput });
    }
}





