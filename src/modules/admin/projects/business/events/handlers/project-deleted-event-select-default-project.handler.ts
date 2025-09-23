import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { inject } from "inversify";
import ProjectDeletedEvent from "../project-deleted-event";
import { TYPES } from "../../../types";
import SelectProjectUseCase from "../../usecases/select-project.usecase";
import IProjectsLocalRepository from "../../plugins/projects.local.repository.plugin";

export default class ProjectDeletedEventSelectDefaultProjectHandler implements IAsyncEventHandler<ProjectDeletedEvent> {
  constructor(
		@inject(TYPES.SelectProjectUseCase)
		private readonly _selectProjectUseCase: SelectProjectUseCase,

		@inject(TYPES.ProjectsLocalRepository)
		private readonly _localRepository: IProjectsLocalRepository,
	) {}

	public canHandle(event: ProjectDeletedEvent): boolean {
		return event instanceof ProjectDeletedEvent;
	}

	public async handleAsync(event: ProjectDeletedEvent): Promise<void> {
		const projects = this._localRepository.getProjects().value;

		if (!projects.length) return;

		this._selectProjectUseCase.execute({ projectId: projects[projects.length - 1].id })
	}
}
