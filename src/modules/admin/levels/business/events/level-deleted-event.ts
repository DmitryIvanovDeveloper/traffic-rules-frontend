import { IEvent } from "@/infrastructure/events/event";

export default class LevelDeletedEvent implements IEvent {
    readonly type = 'LevelDeletedEvent';
    readonly levelId: string;
    
    constructor(levelId: string) {
        this.levelId = levelId;
    }
}