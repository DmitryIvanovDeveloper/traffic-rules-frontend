import { inject } from "inversify";
import { TYPES } from "../../../types";
import IAchievementsLocalRepository from "../../plugins/achievements.local-repository.plugin";
import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import AchievementDeletedEvent from "../achievement-deleted-event";
import SelectAchievementUseCase from "../../usecases/select-achievements.usecase";

export default class AchievemenetDeletedEventSelectDefaultAchievement implements ISyncEventHandler<AchievementDeletedEvent> {

    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _repository: IAchievementsLocalRepository,

        @inject(TYPES.SelectAchievementUseCase)
        private readonly _selectAchievementUseCase: SelectAchievementUseCase
    ){
    }

    public canHandle(event: AchievementDeletedEvent): boolean {
        return event instanceof AchievementDeletedEvent;
    }

    public handle(event: AchievementDeletedEvent): void {
        const achievements = this._repository.getAchievements().value
        if (!achievements.length) {
            return;
        }

        this._selectAchievementUseCase.execute({ achievementId: achievements[achievements.length -1].id })
    }
}
