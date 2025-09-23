import Result from "@/infrastructure/helpers/result";
import ProjectDTO, { CreateProjectRequestDTO } from "../dtos/create-project.dto";
import { UpdateProjectRequestDTO } from "../dtos/update-project.dto";

export default interface IProjectsHttpRepository {
	loadProjectUsers(projectId: string): Promise<Result<void>>;
    deleteProject(projectId: string): Promise<Result<void>>;
    updateProject(projectId: string, newProject: UpdateProjectRequestDTO): Promise<Result<ProjectDTO>>;
    createProject:(dto: CreateProjectRequestDTO) => Promise<Result<ProjectDTO>>;
    loadProjects(): Promise<Result<Array<ProjectDTO>>>;
}