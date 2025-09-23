import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import ProjectSelectedEvent from "@/modules/admin/projects/business/events/project-selected-event";
import AdminAuthenticatedEvent from "@/modules/shared/authentication/business/events/admin-authenticated.event";
import { inject } from "inversify";
import LoadAchievementsUseCase from "../../usecases/load-achievements.usecase";
import { TYPES } from "../../../types";

export default class ProjectSelectedEventLoadAchievementsHandler implements IAsyncEventHandler<ProjectSelectedEvent> {

    constructor(
        @inject(TYPES.LoadAchievementsUseCase)
        private readonly _loadPresentLevelsUseCase: LoadAchievementsUseCase
    ){
    }
    canHandle(event: ProjectSelectedEvent): boolean {
        return event instanceof ProjectSelectedEvent;
    }

    async handleAsync(event: ProjectSelectedEvent): Promise<void> {
        await this._loadPresentLevelsUseCase.execute({projectId: event.projectId });
    }
}
