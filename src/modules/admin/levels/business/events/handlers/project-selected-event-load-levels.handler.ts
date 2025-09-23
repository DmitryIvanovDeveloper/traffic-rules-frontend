import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import ProjectSelectedEvent from "@/modules/admin/projects/business/events/project-selected-event";
import AdminAuthenticatedEvent from "@/modules/shared/authentication/business/events/admin-authenticated.event";
import { TYPES } from "../../../types";
import LoadLevelsUseCase from "../../usecases/load-levels.usecase";
import { inject } from "inversify";

export default class ProjectSelectedEventLoadLevelsHandler implements IAsyncEventHandler<ProjectSelectedEvent> {

  constructor(
    @inject(TYPES.LoadPresentLevelsUseCase)
    private readonly _loadPresentLevelsUseCase: LoadLevelsUseCase
  ){

  }
  public canHandle(event: ProjectSelectedEvent): boolean {
    return event instanceof ProjectSelectedEvent;
  }

  public async handleAsync(event: ProjectSelectedEvent): Promise<void> {
      await this._loadPresentLevelsUseCase.execute(event.projectId);
  }
}
