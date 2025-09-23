import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES} from "@/infrastructure/bootstrap/types";
import IProjectsHttpRepository from "../plugins/projects.http.repository.plugin";
import Project from "../entities/project";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import ProjectsNotLoadedError from "../errors/projects-not-loaded.error";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ProjectsLoadedEvent from "../events/projects-loaded-event";
import { LoadProjectUsersInput, LoadProjectUsersOutput } from "./types/load-projects-users.type";

@injectable()
export default class LoadProjectsUsersUseCase extends BaseUseCase<LoadProjectUsersInput, LoadProjectUsersOutput> {
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

	public async execute(input: LoadProjectUsersInput): Promise<LoadProjectUsersOutput> {

		const { projectId } = input;

		const result = await this._projectsRepository.loadProjectUsers(projectId);
		// if (!result.hasData()) {
		// 	return Result.failure<void>(new ProjectsNotLoadedError());
		// }

		// const projects = result.data.map(Project.toEntity);
		// this._localRepository.storeProjects(projects);

		// const projectsId = projects.map((project) => project.id);
		// this._eventBus.publishAsync(new ProjectsLoadedEvent(projectsId))

		return Result.success<void>();
	}
}
