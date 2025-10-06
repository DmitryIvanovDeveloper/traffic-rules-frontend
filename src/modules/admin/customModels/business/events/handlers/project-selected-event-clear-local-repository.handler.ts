import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import ProjectSelectedEvent from "@/modules/admin/projects/business/events/project-selected-event";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import ICustomModelsLocalRepository from "../../plugins/custom-models.local.repository.plugin";

export default class ProjectSelectedEventClearLocalRepositoryHandler implements ISyncEventHandler<ProjectSelectedEvent> {

    constructor(
        @inject(TYPES.CustomModelsLocalRepository)
        private readonly _localRepository: ICustomModelsLocalRepository
    ) {}

    public canHandle(event: ProjectSelectedEvent): boolean {
        return event instanceof ProjectSelectedEvent;
    }

    public handle(event: ProjectSelectedEvent): void {
        this._localRepository.clearCustomModels();
    }
}








