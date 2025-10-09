import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ICustomModelsLocalRepository from "../plugins/custom-models.local.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";

export interface ClearCustomModelsLocalInput {
    // No input needed
}

export interface ClearCustomModelsLocalOutput {
    success: boolean;
}

@injectable()
export default class ClearCustomModelsLocalUseCase extends BaseUseCase<ClearCustomModelsLocalInput, ClearCustomModelsLocalOutput> {

    constructor(
        @inject(TYPES.CustomModelsLocalRepository)
        private readonly _localRepository: ICustomModelsLocalRepository
    ) {
        super()
    }

    public execute = async (input: ClearCustomModelsLocalInput): Promise<ClearCustomModelsLocalOutput> => {
        this._localRepository.clearCustomModels();
        
        return Result.success({ success: true });
    }
}










