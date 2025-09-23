import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { NetworkError } from "@/infrastructure/errors/network.error";
import GetProjectResponse from "./dtos/get-levels.response";
import { ILevelCreateRequestDTO, ILevelCreateResponseDTO } from "../../business/dtos/level.create.dto";
import CreateLevelRequest from "./dtos/create-level.request";
import CreateLevelResponse from "./dtos/post-level.response";
import ILevelsHttpRepository from "../../business/plugins/levels.http.repository.plugin";
import { ILevelUpdateRequestDTO, ILevelUpdateResponseDTO } from "../../business/dtos/level.update.dto";
import  { UpdateLevelRequest, UpdateLevelResponse } from "./dtos/update-level.request";
import { mapLevelResponseToDto } from "./dtos/mapper";
import { ILevelLoadResponseDTO } from "../../business/dtos/level.load.dto";
import { DeleteLevelResponse } from "./dtos/delete-level";

export default class LevelsHttpRepository implements ILevelsHttpRepository  {

    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient 
    ){}
    
  
    public loadLevels = async (projectId: string): Promise<Result<Array<ILevelLoadResponseDTO>>> => {
        const endpoint = `cards/admin/levels/?project_id=${projectId}`;

        const response = await this._httpClient.get<Array<GetProjectResponse>>(endpoint);

        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = response.data.map(mapLevelResponseToDto);

        return Result.success(dto);
    }

    public createLevel = async (createLevelDto: ILevelCreateRequestDTO): Promise<Result<ILevelCreateResponseDTO>> => {
        const endpoint = `cards/admin/levels/`;

        const request = new CreateLevelRequest(createLevelDto);

        const response = await this._httpClient.post<CreateLevelResponse, CreateLevelRequest>(endpoint, request);
        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = mapLevelResponseToDto(response.data);

        return Result.success(dto);
    }

    public updateLevel = async (updateRequest: ILevelUpdateRequestDTO, levelId: string): Promise<Result<ILevelUpdateResponseDTO>> => {
        const endpoint = `cards/admin/levels/${levelId}/`;

        const request = new UpdateLevelRequest(updateRequest);

        const response = await this._httpClient.put<UpdateLevelResponse, UpdateLevelRequest>(endpoint, request);
        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }


        return Result.success({});
    }

    public deleteLevel = async (levelId: string): Promise<Result<void>> => {
        const endpoint = `cards/admin/levels/${levelId}/`;

        const response = await this._httpClient.delete<DeleteLevelResponse>(endpoint);
        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        return Result.success();
    }

    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
        return Result.failure();
    }
}