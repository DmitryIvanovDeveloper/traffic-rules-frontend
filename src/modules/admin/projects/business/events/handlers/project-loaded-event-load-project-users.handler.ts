import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SelectProjectUseCase from "../../usecases/select-project.usecase";
import ProjectsLoadedEvent from "../projects-loaded-event";

export default class ProjectsLoadedEventLoadProjectsUsersHandler implements IAsyncEventHandler<ProjectsLoadedEvent> {
  constructor(
		@inject(TYPES.SelectProjectUseCase)
		private readonly _selectProjectUseCase: SelectProjectUseCase,
	) {}

	public canHandle(event: ProjectsLoadedEvent): boolean {
		return event instanceof ProjectsLoadedEvent;
	}

	public async handleAsync(event: ProjectsLoadedEvent): Promise<void> {
		if (!event.projectsId.length) return;

		await this._selectProjectUseCase.execute({ projectId: event.projectsId[0] });
	}
}
