import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { inject } from "inversify";
import IAchievementsHttpRepository from "../plugins/achievements.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import { DeleteAchievementInput, DeleteAchievementOutput } from "./types/delete-achievement";
import AchievementNotDeletedError from "../errors/achievement-not-deleted.error";
import DeleteAchievementLocalUseCase from "./delete-achievement-local.usecase";

export default class DeleteAchievementUseCase extends BaseUseCase<DeleteAchievementInput, DeleteAchievementOutput> {

    constructor(
        @inject(TYPES.AchievementsHttpRepository)
        private readonly _httpRepository: IAchievementsHttpRepository,

        @inject(TYPES.DeleteAchievementLocalUseCase)
        private readonly _deleteAchievementLocalUseCase: DeleteAchievementLocalUseCase,
    ) {
        super();
    }

    public execute = async (input: DeleteAchievementInput): Promise<DeleteAchievementOutput> => {
        
        const result = await this._httpRepository.delete(input.achievementId);
        if (!result.isSuccess) {
            return Result.failure(new AchievementNotDeletedError(input.achievementId))
        }

        this._deleteAchievementLocalUseCase.execute(input);

        return Result.success();
    }
    
}