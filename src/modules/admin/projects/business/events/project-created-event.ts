import { IEvent } from "@/infrastructure/events/event";

export default class ProjectCreatedEvent implements IEvent {
    readonly type = 'ProjectCreatedEvent';

    readonly projectId: string;
    
    constructor(projectId: string) {
        this.projectId = projectId;
    }
}