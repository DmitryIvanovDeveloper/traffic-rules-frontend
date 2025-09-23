import IAchievementsHttpRepository from "@/modules/admin/achievements/business/plugins/achievements.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import GetAchievementsResponse from "./dtos/get-achievements.dto";
import { NetworkError } from "@/infrastructure/errors/network.error";
import { LoadAchievementsResponseDTO } from "../../business/dtos/load-achievements.dto";
import { CreateAchievementRequestDTO, CreateAchievementResponseDTO } from "../../business/dtos/create-achievements.dto";
import { PostAchievementRequest, PostAchievemensResponse } from "./dtos/post-achievements.dto";
import { DeleteAchievementResponse } from "./dtos/delete-achievements.dto";

export default class AchievementsHttpRepository implements IAchievementsHttpRepository {

	constructor(
		@inject(TYPES.HttpClient)
		private readonly _httpClient: IHttpClient 
	){}
   
    public async create(requestDto: CreateAchievementRequestDTO): Promise<Result<CreateAchievementResponseDTO>> {
        const endpoint = `cards/admin/rewards/`;

        const request = new PostAchievementRequest(requestDto);

        const response = await this._httpClient.post<PostAchievemensResponse, PostAchievementRequest>(endpoint, request);

        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = new CreateAchievementResponseDTO(response.data)
        
        return Result.success(dto);
    }

    public async delete(achievementId: string): Promise<Result<void>> {
        const endpoint = `cards/admin/rewards/${achievementId}`;

        const response = await this._httpClient.delete<DeleteAchievementResponse>(endpoint);
        if (!response.isSuccess) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        return Result.success();
    }
  

	public async load(projectId: string): Promise<Result<ReadonlyArray<LoadAchievementsResponseDTO>>> {
		const endpoint = `cards/admin/rewards/?project_id=${projectId}`;

        const response = await this._httpClient.get<ReadonlyArray<GetAchievementsResponse>>(endpoint);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }
        
        const dto = response.data.map(achievement => new LoadAchievementsResponseDTO(achievement))
        return Result.success(dto);
	}

	private handleNetworkError<T>(networkError: NetworkError): Result<T> {
        return Result.failure();
    }
}
