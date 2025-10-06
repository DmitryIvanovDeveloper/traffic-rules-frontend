import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IModelVariantsLocalRepository from "../plugins/model-variants.local.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";

@injectable()
export default class ClearModelVariantsLocalUseCase extends BaseUseCase<void, void> {

    constructor(
        @inject(TYPES.ModelVariantsLocalRepository)
        private readonly _localRepository: IModelVariantsLocalRepository,
    ) {
        super()
    }

    public execute = async (): Promise<void> => {
        this._localRepository.clearModelVariants();
    }
}







