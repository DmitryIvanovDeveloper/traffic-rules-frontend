import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";
import SelectAchievementUseCase from "./select-achievements.usecase";

@injectable()
export default class PreviousAchievementUseCase {
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

        const index = Achievements.findIndex(q => q.id === Achievement.id);

        const prevIndex = (index - 1 + Achievements.length) % Achievements.length;

        const prevAchievement = Achievements[prevIndex];

        this._selectAchievementUseCase.execute({ achievementId: prevAchievement.id });

        return Result.success();
    }
}
