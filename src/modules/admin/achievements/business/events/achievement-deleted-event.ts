import { IEvent } from "@/infrastructure/events/event";

export default class AchievementDeletedEvent implements IEvent {
    readonly type = 'AchievementDeletedEvent';
    achievementId: string;

    constructor(achievementId: string) {
        this.achievementId = achievementId;
    }
}