import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import ILevelsHttpRepository from "../plugins/levels.http.repository.plugin";
import LevelNotDeletedError from "../errors/level-not-deleted.error";
import DeleteLevelsLocalUseCase from "./delete-levels-local.usecase";
import { DeleteLevelInput, DeleteLevelOutput } from "./types/delete-level.type";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";

@injectable()
export default class DeleteLevelUseCase extends BaseUseCase<DeleteLevelInput, DeleteLevelOutput> {
    constructor(
        @inject(TYPES.LevelsHttpRepository)
        private readonly _repository: ILevelsHttpRepository,

        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,

        @inject(TYPES.DeleteLevelLocalUseCase)
        private readonly _deleteLevelLocalUseCase: DeleteLevelsLocalUseCase,
    ) {
        super();
    }

    public async execute(input: DeleteLevelInput): Promise<DeleteLevelOutput> {

        const levelId = input.levelId;
     
        
        const result = await this._repository.deleteLevel(levelId);
        if (!result.isSuccess) {
            return Result.failure(new LevelNotDeletedError(levelId));
        }

        this._deleteLevelLocalUseCase.execute(input);

        return Result.success();
    }
}
