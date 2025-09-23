import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import { SelectAchievementInput, SelectAchievementOutput } from "./types/select-achievement";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";
import AchievementsNotFoundError from "../errors/achievement-not-found.error";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import AchievementSelectedEvent from "../events/achievement-selected-event";

export default class SelectAchievementUseCase extends BaseUseCase<SelectAchievementInput, SelectAchievementOutput> {

    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _localRepository: IAchievementsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super();
    }

    public execute = async (input: SelectAchievementInput): Promise<SelectAchievementOutput> => {
        const achievement = this._localRepository.findAchievementById(input.achievementId);
        if (!achievement) {
            return Result.failure(new AchievementsNotFoundError(input.achievementId))
        }

        this._localRepository.storeAchievement(achievement);
        this._eventBus.publishAsync(new AchievementSelectedEvent(input.achievementId))
        return Result.success();
    }
    
}