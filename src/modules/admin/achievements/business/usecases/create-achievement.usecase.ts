import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { inject } from "inversify";
import IAchievementsHttpRepository from "../plugins/achievements.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";
import { CreateAchievementInput, CreateAchievementOutput } from "./types/create-achievement";
import AchievementNotCreatedError from "../errors/achievement-not-created.error";
import Achievement from "../entities/achievements";
import SelectAchievementUseCase from "./select-achievements.usecase";

export default class CreateAchievementUseCase extends BaseUseCase<CreateAchievementInput, CreateAchievementOutput> {

    constructor(
        @inject(TYPES.AchievementsHttpRepository)
        private readonly _httpRepository: IAchievementsHttpRepository,

        @inject(TYPES.AchievementsLocalRepository)
        private readonly _localRepository: IAchievementsLocalRepository,

        @inject(TYPES.SelectAchievementUseCase)
        private readonly _selectAchievementUseCase: SelectAchievementUseCase
    ) {
        super();
    }

    public execute = async (input: CreateAchievementInput): Promise<CreateAchievementOutput> => {
        
        const dto = Achievement.toCreateRequest(input.projectId)

        const result = await this._httpRepository.create(dto);

        if (!result.hasData()) {
            return Result.failure(new AchievementNotCreatedError())
        }

        const achievement = Achievement.toEntity(result.data);
        this._localRepository.addAchievement(achievement);

        this._selectAchievementUseCase.execute({ achievementId: achievement.id });

        return Result.success();
    }
    
}