import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import IAchievementsLocalRepository from "../../plugins/achievements.local-repository.plugin";
import QuestionsLoadedEvent from "@/modules/admin/questions/business/events/questions-loaded-event";

export default class QuestionsLoadedEventUpdateAvailableQuestionsHandler implements ISyncEventHandler<QuestionsLoadedEvent> {

    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _repository: IAchievementsLocalRepository
    ){
    }

    public canHandle(event: QuestionsLoadedEvent): boolean {
        return event instanceof QuestionsLoadedEvent;
    }

    public handle(event: QuestionsLoadedEvent): void {
        if (!event.questions.length) {
            return;
        }

        const achievements =  this._repository.getAchievements().value
        const updatedAchievements = achievements.map(achievement => achievement.updatedWithAvailableQuestions(event.questions));
        this._repository.storeAchievements(updatedAchievements);

    }
}
