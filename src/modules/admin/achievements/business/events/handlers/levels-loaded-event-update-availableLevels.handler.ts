import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import LevelsLoadedEvent from "@/modules/admin/levels/business/events/levels-loaded-event";
import IAchievementsLocalRepository from "../../plugins/achievements.local-repository.plugin";

export default class LevelsLoadedEventUpdateAvailableLevelsHandler implements ISyncEventHandler<LevelsLoadedEvent> {

    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _repository: IAchievementsLocalRepository
    ){
    }

    public canHandle(event: LevelsLoadedEvent): boolean {
        return event instanceof LevelsLoadedEvent;
    }

    public handle(event: LevelsLoadedEvent): void {
        if (!event.levels.length) {
            return;
        }

        const achievements =  this._repository.getAchievements().value
        const updatedAchievements = achievements.map(achievement => achievement.updatedWithAvailableLevels(event.levels));
        this._repository.storeAchievements(updatedAchievements);

    }
}
