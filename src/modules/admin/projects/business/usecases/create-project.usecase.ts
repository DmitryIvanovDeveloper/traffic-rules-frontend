import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IProjectsRepository from "../plugins/projects.http.repository.plugin";
import Project from "../entities/project";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateProjectInput, CreateProjectOutput} from "./types/create-project.type";
import ProjectNotCreatedError from "../errors/project-not-created.error";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ProjectCreatedEvent from "../events/project-created-event";

@injectable()
export default class CreateProjectUseCase extends BaseUseCase<CreateProjectInput, CreateProjectOutput> {

    constructor(
        @inject(TYPES.ProjectsHttpRepository)
        private readonly _projectsRepository: IProjectsRepository,

        @inject(TYPES.ProjectsLocalRepository)
        private readonly _localRepository: IProjectsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super()
    }

    public execute = async (input: CreateProjectInput): Promise<CreateProjectOutput> => {
        const newProject = Project.toRequestDto(input);

        const result = await this._projectsRepository.createProject(newProject);
        if (!result.hasData()) {
            return Result.failure(new ProjectNotCreatedError());
        }

        const project = Project.toEntity(result.data);
        this._localRepository.addProject(project);

        await this._eventBus.publishAsync(new ProjectCreatedEvent(project.id));
        
        return Result.success();
    }
}