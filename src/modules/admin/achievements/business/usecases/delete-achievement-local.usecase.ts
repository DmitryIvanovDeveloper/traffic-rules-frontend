import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";
import { DeleteAchievementInput, DeleteAchievementOutput } from "./types/delete-achievement";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import AchievementDeletedEvent from "../events/achievement-deleted-event";
import { ToastNotificationUseCases } from "@/modules/shared/notification/business/usecases/toast-notification.usecases";

export default class DeleteAchievementLocalUseCase extends BaseUseCase<DeleteAchievementInput, DeleteAchievementOutput> {

    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _localRepository: IAchievementsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,

        @inject(SharedTYPES.ToastNotificationUseCases)
        private readonly _toastNotificationUseCases: ToastNotificationUseCases,
    ) {
        super();
    }

    public execute = async (input: DeleteAchievementInput): Promise<DeleteAchievementOutput> => {
        
        const achievements = this._localRepository.getAchievements().value;
        const updatedAchievements = achievements.filter(achievement => achievement.id !== input.achievementId);
        this._localRepository.storeAchievements(updatedAchievements);

        this._eventBus.publish(new AchievementDeletedEvent(input.achievementId));
        this._toastNotificationUseCases.success("Achievment deleted sucessful");
        
        return Result.success();
    }
    
}