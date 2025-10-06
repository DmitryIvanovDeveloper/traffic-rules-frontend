import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsHttpRepository from "../plugins/custom-models.http.repository.plugin";
import ICustomModelsLocalRepository from "../plugins/custom-models.local.repository.plugin";
import LoadCustomModelsDTO from "../dtos/load-custom-models.dto";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadCustomModelsInput, LoadCustomModelsOutput } from "./types/load-custom-models.type";
import CustomModelsNotLoadedError from "../errors/custom-models-not-loaded.error";

@injectable()
export default class LoadCustomModelsUseCase extends BaseUseCase<LoadCustomModelsInput, Result<LoadCustomModelsOutput>> {

    constructor(
        @inject(TYPES.CustomModelsHttpRepository)
        private readonly _customModelsRepository: ICustomModelsHttpRepository,

        @inject(TYPES.CustomModelsLocalRepository)
        private readonly _localRepository: ICustomModelsLocalRepository
    ) {
        super()
    }

    public execute = async (input: LoadCustomModelsInput): Promise<Result<LoadCustomModelsOutput>> => {
        console.log('LoadCustomModelsUseCase: Loading models for project:', input.projectId);
        const dto = new LoadCustomModelsDTO(input.projectId);
        const result = await this._customModelsRepository.loadCustomModels(dto);
        
        if (!result.hasData()) {
            console.error('LoadCustomModelsUseCase: Failed to load models:', result.errors);
            return Result.failure<LoadCustomModelsOutput>(new CustomModelsNotLoadedError());
        }

        const models = result.data;
        console.log('LoadCustomModelsUseCase: Loaded', models.length, 'models');
        this._localRepository.clearCustomModels();
        models.forEach(model => this._localRepository.addCustomModel(model));
        
        return Result.success({ models });
    }
}
