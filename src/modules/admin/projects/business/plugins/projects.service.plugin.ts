import Result from "@/infrastructure/helpers/result";
import Project from "../entities/project";

export default interface IProjectsService {
    getProjects(): ReadonlyArray<Project>;
    getSelectedProjectId:() => Result<string>
}