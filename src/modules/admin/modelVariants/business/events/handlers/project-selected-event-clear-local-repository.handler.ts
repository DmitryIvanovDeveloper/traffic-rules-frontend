import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import ProjectSelectedEvent from "@/modules/admin/projects/business/events/project-selected-event";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import IModelVariantsLocalRepository from "../../plugins/model-variants.local.repository.plugin";

export default class ProjectSelectedEventClearLocalRepositoryHandler implements ISyncEventHandler<ProjectSelectedEvent> {

    constructor(
        @inject(TYPES.ModelVariantsLocalRepository)
        private readonly _localRepository: IModelVariantsLocalRepository
    ) {}

    public canHandle(event: ProjectSelectedEvent): boolean {
        return event instanceof ProjectSelectedEvent;
    }

    public handle(event: ProjectSelectedEvent): void {
        this._localRepository.clearModelVariants();
    }
}

