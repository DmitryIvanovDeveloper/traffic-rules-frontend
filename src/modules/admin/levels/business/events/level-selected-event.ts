import { IEvent } from "@/infrastructure/events/event";

export default class LevelSelectedEvent implements IEvent {
    readonly type = 'LevelSelectedEvent';
    readonly levelId: string;
    
    constructor(levelId: string) {
        this.levelId = levelId;
    }
}