import { IEvent } from "@/infrastructure/events/event";

export default class SaveProjectEvent implements IEvent {
    readonly type = 'SaveProjectEvent';
    projectId: string;
} 