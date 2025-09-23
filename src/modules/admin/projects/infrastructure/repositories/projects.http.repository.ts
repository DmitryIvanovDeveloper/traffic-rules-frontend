import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import IProjectsHttpRepository from "../../business/plugins/projects.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { NetworkError } from "@/infrastructure/errors/network.error";
import ProjectDTO, { CreateProjectRequestDTO } from "../../business/dtos/create-project.dto";
import GetProjectResponse from "./dtos/get-project";
import { mapProjectResponseToDto } from "./dtos/mapper";
import CreateProjectResponseDTO from "../../business/dtos/create-project.dto";
import UpdateProjectResponseDTO, { UpdateProjectRequestDTO } from "../../business/dtos/update-project.dto";
import PutProjectResponse, { PutProjectRequest } from './dtos/update-project';
import { PostProjectRequest, PostProjectResponse } from "./dtos/post-project";
import { DeleteProjectResponse } from "./dtos/delete-project";

export default class ProjectsHttpRepository implements IProjectsHttpRepository  {

    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient 
    ){}
   
   
    public createProject = async (createProjectRequest: CreateProjectRequestDTO): Promise<Result<ProjectDTO>> => {
        const endpoint = 'cards/admin/projects/';

        const request = new PostProjectRequest(createProjectRequest);

        const response = await this._httpClient.post<PostProjectResponse, PostProjectRequest>(endpoint, request);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }
        
        const projectResponse = new CreateProjectResponseDTO(response.data);
        return Result.success(projectResponse);
    }

    public updateProject = async (projectId: string, dto: UpdateProjectRequestDTO): Promise<Result<UpdateProjectResponseDTO>> => {
        const endpoint = `cards/admin/projects/${projectId}/`;

        const request = new PutProjectRequest(dto);

        const response = await this._httpClient.put<PutProjectResponse, PutProjectRequest>(endpoint, request);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }
        
        const projectResponse = new UpdateProjectResponseDTO(response.data);
        return Result.success(projectResponse);
    }

    public loadProjects = async (): Promise<Result<Array<ProjectDTO>>> => {
        const endpoint = 'cards/admin/projects/';

        const response = await this._httpClient.get<Array<GetProjectResponse>>(endpoint);
        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = response.data.map(mapProjectResponseToDto);

        return Result.success(dto);
    }

    public deleteProject = async (projectId: string): Promise<Result<void>> => {
        const endpoint = `cards/admin/projects/${projectId}/`;

        const response = await this._httpClient.delete<DeleteProjectResponse>(endpoint);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }
        
        return Result.success();
    }

    public loadProjectUsers = async (projectId: string): Promise<Result<void>> => {
        const endpoint = `cards/admin/projects/${projectId}/`;

        const response = await this._httpClient.delete<DeleteProjectResponse>(endpoint);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }
        
        return Result.success();
    }


    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
        return Result.failure();
    }
}