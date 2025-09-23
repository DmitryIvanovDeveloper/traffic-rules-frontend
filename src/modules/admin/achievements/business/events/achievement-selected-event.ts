import { IEvent } from "@/infrastructure/events/event";

export default class AchievementSelectedEvent implements IEvent {
    readonly type = 'AchievementSelectedEvent';
    public readonly achievementId: string;

    constructor(achievementId: string) {
        this.achievementId = achievementId;
    }
}