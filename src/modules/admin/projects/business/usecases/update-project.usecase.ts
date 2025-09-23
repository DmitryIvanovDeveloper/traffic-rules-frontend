import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IProjectsRepository from "../plugins/projects.http.repository.plugin";
import Project from "../entities/project";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { UpdateProjectInput, UpdateProjectOutput} from "./types/Update-project.type";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import ProjectsNotUpdatedError from "../errors/project-not-updated.error";

@injectable()
export default class UpdateProjectUseCase extends BaseUseCase<UpdateProjectInput, UpdateProjectOutput> {
    constructor(
        @inject(TYPES.ProjectsHttpRepository)
        private readonly _projectsRepository: IProjectsRepository,

        @inject(TYPES.ProjectsLocalRepository)
        private readonly _localRepository: IProjectsLocalRepository,
    ) {
        super()
    }

    public execute = async (input: UpdateProjectInput): Promise<UpdateProjectOutput> => {
        const project = this._localRepository.getProject().value;
        if (!project) {
            return Result.failure(new ProjectsNotUpdatedError());
        }

        if (!project.edited) {
            return Result.success();
        }

        const errors = project.validate();
        const updatedProject = project.withUpdatedShowError();
        this._localRepository.storeProject(updatedProject);

        if (errors.length) {
            return Result.failure(new ProjectsNotUpdatedError());
        }
        
        const dto = Project.toRequestDto({ name: project.name });
        const result = await this._projectsRepository.updateProject(project.id, dto);
        
        if (!result.hasData()) {
            return Result.failure(new ProjectsNotUpdatedError());
        }

        const entity = Project.toEntity(result.data);
        this._localRepository.updateProjects(entity);
        
        return Result.success();
    }
}