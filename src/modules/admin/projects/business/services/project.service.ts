import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import IProjectsService from "../plugins/projects.service.plugin";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import ProjectNotSelectedError from "../errors/project-not-selected.error";
import Project from "../entities/project";

export default class ProjectsService  implements IProjectsService {

    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _repository: IProjectsLocalRepository
    ){}
   

    public getSelectedProjectId = (): Result<string> => {
        const project = this._repository.getProject();
        if (!project.value) {
            return Result.failure(new ProjectNotSelectedError());
        }

        return Result.success(project.value.id);
    }

    public getProjects(): ReadonlyArray<Project> {
        const projects = this._repository.getProjects().value;
        if (!projects) {
            return []
        }

        return projects;
    }
}