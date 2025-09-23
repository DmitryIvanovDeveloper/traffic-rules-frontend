import Result from "@/infrastructure/helpers/result";
import Project from "../../business/entities/project";
import IProjectsLocalRepository from "../../business/plugins/projects.local.repository.plugin";
import { Ref, ref } from "vue";
import ProjectNotFoundError from "../../business/errors/project-not-found.error";

export default class ProjectsLocalRepository implements IProjectsLocalRepository  {

    private _project = ref<Project | undefined>();
    private _projects = ref<Array<Project> | undefined>(undefined);

    public storeProject(project: Project): void {
        this._project.value = project;
    }

    public getProject(): Ref<Project | undefined> {
       return this._project;
    }

    public getProjects(): Ref<Array<Project> | undefined> {
        return this._projects;
    }

    public addProject(project: Project): void {
        if (!this._projects.value) {
            return;
        }
        this._projects.value.push(project);
    }

    public updateProjects(updatedProject: Project): void {
        if (!this._projects.value) {
            return;
        }
        const index = this._projects.value.findIndex((project) => project.id === updatedProject.id);
        if (index === -1) {
            return;
        }

        this._projects.value[index] = updatedProject;
        this._project.value = updatedProject;

        if (this._project.value?.id !== updatedProject.id) {
            return;
        }

        this._project.value = updatedProject;
    }

    public findProjectById(id: string): Result<Project> {
        if (!this._projects.value) {
            return Result.failure(new ProjectNotFoundError(id))
        }
        const expectedProject = this._projects.value.find(project => project.id === id);
        if (!expectedProject) {
            return Result.failure(new ProjectNotFoundError(id))
        }

        return Result.success(expectedProject);
    }

    public storeProjects(projects: Array<Project>): void {
        this._projects.value = projects;
    }

    public clear = (): void => {
        this._projects.value = undefined;
        this._project.value = undefined
    }
}