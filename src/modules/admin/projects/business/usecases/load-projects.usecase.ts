import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES} from "@/infrastructure/bootstrap/types";
import IProjectsHttpRepository from "../plugins/projects.http.repository.plugin";
import Project from "../entities/project";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadProjectsInput, LoadProjectsOutput } from "./types/load-projects.type";
import ProjectsNotLoadedError from "../errors/projects-not-loaded.error";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ProjectsLoadedEvent from "../events/projects-loaded-event";

@injectable()
export default class LoadProjectsUseCase extends BaseUseCase<LoadProjectsInput, LoadProjectsOutput> {
	constructor(
		@inject(TYPES.ProjectsHttpRepository)
		private readonly _projectsRepository: IProjectsHttpRepository,

		@inject(TYPES.ProjectsLocalRepository)
		private readonly _localRepository: IProjectsLocalRepository,

		@inject(SharedTYPES.EventBus)
		private readonly _eventBus: IEventBus,
	) {
		super();
	}

	public async execute(): Promise<LoadProjectsOutput> {
		this._localRepository.clear();
		const result = await this._projectsRepository.loadProjects();
		if (!result.hasData()) {
			return Result.failure<void>(new ProjectsNotLoadedError());
		}

		const projects = result.data.map(Project.toEntity);
		this._localRepository.storeProjects(projects);

		const projectsId = projects.map((project) => project.id);
		this._eventBus.publishAsync(new ProjectsLoadedEvent(projectsId))

		return Result.success<void>();
	}
}
