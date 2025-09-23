import { IEvent } from "@/infrastructure/events/event";

export default class LevelCreatedEvent implements IEvent {
    readonly type = 'LevelCreatedEvent';
    readonly levelId: string;
    
    constructor(levelId: string) {
        this.levelId = levelId;
    }
}