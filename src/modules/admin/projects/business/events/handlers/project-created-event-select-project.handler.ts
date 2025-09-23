import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import ProjectCreatedEvent from "../project-created-event";
import SelectProjectUseCase from "../../usecases/select-project.usecase";

export default class ProjectCreatedEventSelectProjectHandler implements IAsyncEventHandler<ProjectCreatedEvent> {
  constructor(
		@inject(TYPES.SelectProjectUseCase)
		private readonly _selectProjectUseCase: SelectProjectUseCase,
	) {}

	public canHandle(event: ProjectCreatedEvent): boolean {
		return event instanceof ProjectCreatedEvent;
	}

	public async handleAsync(event: ProjectCreatedEvent): Promise<void> {
		await this._selectProjectUseCase.execute({ projectId: event.projectId });
	}
}
