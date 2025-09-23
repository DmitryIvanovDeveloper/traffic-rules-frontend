import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";
import { DeleteAchievementsInput, DeleteAchievementsOutput } from "./types/delete-achievements";

export default class ClearAchievementsLocalUseCase  {
    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _localRepository: IAchievementsLocalRepository,
    ) {
    }

    public execute = (input: DeleteAchievementsInput): Result<void> => {
        this._localRepository.clear()
        return Result.success();
    }
    
}