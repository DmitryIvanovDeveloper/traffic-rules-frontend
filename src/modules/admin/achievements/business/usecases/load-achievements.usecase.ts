import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadAchievementInput, LoadAchievementOutput } from "./types/load-achievements";
import { inject } from "inversify";
import IAchievementsHttpRepository from "../plugins/achievements.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import Achievement from "../entities/achievements";
import AchievementsNotLoadedError from "../errors/achievements-not-loaded.error";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";

export default class LoadAchievementsUseCase extends BaseUseCase<LoadAchievementInput, LoadAchievementOutput> {

    constructor(
        @inject(TYPES.AchievementsHttpRepository)
        private readonly _httpRepository: IAchievementsHttpRepository,

        @inject(TYPES.AchievementsLocalRepository)
        private readonly _localRepository: IAchievementsLocalRepository
    ) {
        super();
    }

    public execute = async (input: LoadAchievementInput): Promise<LoadAchievementOutput> => {
        
        const result = await this._httpRepository.load(input.projectId);
        if (!result.hasData()) {
            return Result.failure(new AchievementsNotLoadedError())
        }

        const achievements = result.data.map(dto => Achievement.toEntity(dto));

        this._localRepository.storeAchievements(achievements);
        
        return Result.success();
    }
    
}