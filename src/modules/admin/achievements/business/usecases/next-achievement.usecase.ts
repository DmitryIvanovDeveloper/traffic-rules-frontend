import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";
import SelectAchievementUseCase from "./select-achievements.usecase";

@injectable()
export default class NextAchievementUseCase {
    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _repository: IAchievementsLocalRepository,

        @inject(TYPES.SelectAchievementUseCase)
        private readonly _selectAchievementUseCase: SelectAchievementUseCase,
    ) {
    }

    public execute = (): Result<void> => {
        
        const Achievements = this._repository.getAchievements().value;
        const Achievement = this._repository.getAchievement().value;

        if (!Achievements.length || !Achievement) {
            return Result.failure();
        }

        if (!Achievement) {
            return Result.failure();
        }

        const index = Achievements.findIndex(q => q.id === Achievement.id);

        const nextIndex = (index + 1) % Achievements.length;

        const nextAchievement = Achievements[nextIndex];

        this._selectAchievementUseCase.execute({ achievementId: nextAchievement.id });

        return Result.success();
    }
}
