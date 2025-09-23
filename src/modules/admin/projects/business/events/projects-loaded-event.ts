import { IEvent } from "@/infrastructure/events/event";

export default class ProjectsLoadedEvent implements IEvent {
    readonly type = 'ProjectsLoadedEvent';

    readonly projectsId: ReadonlyArray<string>;
    
    constructor(projectsId: ReadonlyArray<string>) {
        this.projectsId = projectsId;
    }
}