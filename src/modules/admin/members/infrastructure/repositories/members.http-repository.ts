import { DeleteMemberProjectResponse } from './dtos/delete-member-project';
import Result from "@/infrastructure/helpers/result";
import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import IMembersHttpRepository from "@/modules/admin/members/business/plugins/members.http-repository.plugin";
import GetUserResponse from "./dtos/get-users.dto";
import { MemberDTO } from "../../business/dtos/load-members.dto";
import { MemberProjectResponse } from "./dtos/member-project.dto";
import { MemberProjectDTO } from "../../business/dtos/member-project.dto";
import { PostMemberProjectRequest, PostMemberProjectResponse } from "./dtos/post-member-project";

export default class MembersHttpRepository implements IMembersHttpRepository {
	constructor(
		@inject(TYPES.HttpClient)
		private readonly _httpClient: IHttpClient
	) {}
   

	public async loadMembers(): Promise<Result<ReadonlyArray<MemberDTO>>> {
		const endpoint = `cards/admin/users/`;

        const response = await this._httpClient.get<ReadonlyArray<GetUserResponse>>(endpoint);
        if (!response.hasData()) {
			return Result.failure();
        }

        const dto = response.data.map((member) => new MemberDTO(member))
        return Result.success(dto);
	}

	public async loadMemberProjects(id: number): Promise<Result<ReadonlyArray<MemberProjectDTO>>> {
		const endpoint = `/cards/admin/user_project?user_id=${id}`;

        const response = await this._httpClient.get<ReadonlyArray<MemberProjectResponse>>(endpoint);
        if (!response.hasData()) {
			return Result.failure();
        }

        const dtos = response.data.map(memberProject =>  new MemberProjectDTO(memberProject));
        return Result.success(dtos);
	}

    public async assignMemberProject(projectId: string, userId: number): Promise<Result<void>> {
        const endpoint = `/cards/projects/`;
        const request = new PostMemberProjectRequest(projectId, userId);
        const response = await this._httpClient.post<PostMemberProjectResponse, PostMemberProjectRequest>(endpoint, request);
        if (!response.hasData()) {
			return Result.failure();
        }

        return response.isSuccess ? Result.success() : Result.failure();
    }

    public async unassignMemberProject(userId: number): Promise<Result<void>> {
        const endpoint = `/cards/projects/${userId}`;
        const response = await this._httpClient.delete<DeleteMemberProjectResponse>(endpoint);
        if (!response.hasData()) {
			return Result.failure();
        }

        return response.isSuccess ? Result.success() : Result.failure();
    }
}
