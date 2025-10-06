import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import ProjectSelectedEvent from "@/modules/admin/projects/business/events/project-selected-event";
import { inject } from "inversify";
import LoadCustomModelsUseCase from "../../usecases/load-custom-models.usecase";
import { TYPES } from "../../../types";

export default class ProjectSelectedEventLoadCustomModelsHandler implements IAsyncEventHandler<ProjectSelectedEvent> {

    constructor(
        @inject(TYPES.LoadCustomModelsUseCase)
        private readonly _loadCustomModelsUseCase: LoadCustomModelsUseCase
    ) {}

    public canHandle(event: ProjectSelectedEvent): boolean {
        return event instanceof ProjectSelectedEvent;
    }

    public async handleAsync(event: ProjectSelectedEvent): Promise<void> {
        console.log('ProjectSelectedEventLoadCustomModelsHandler: Loading models for project:', event.projectId);
        await this._loadCustomModelsUseCase.execute({ projectId: event.projectId });
        console.log('ProjectSelectedEventLoadCustomModelsHandler: Models loaded successfully');
    }
}
