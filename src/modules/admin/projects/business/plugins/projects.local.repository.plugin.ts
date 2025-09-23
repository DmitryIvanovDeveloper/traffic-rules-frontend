import Result from "@/infrastructure/helpers/result";
import Project from "../entities/project";
import { Ref } from "vue";

export default interface IProjectsLocalRepository {
    clear(): unknown;
    updateProjects(updatedProject: Project): unknown;
    getProject(): Ref<Project | undefined>;
    getProjects(): Ref<Array<Project> | undefined>;
    storeProjects(projects: Project[]): void;
    storeProject(project: Project): void;
    addProject(project: Project): void;
    findProjectById(id: string): Result<Project>;
}