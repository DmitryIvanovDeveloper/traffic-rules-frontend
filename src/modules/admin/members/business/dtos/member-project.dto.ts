import { MemberProjectResponse } from "../../infrastructure/repositories/dtos/member-project.dto";

export class MemberProjectDTO {
	public readonly id: number;
    public readonly userId: number;
    public readonly projectId: string;
    public readonly projectName: string;

   	constructor(response: MemberProjectResponse) {
		this.id = response.id;
		this.userId = response.user_id;
		this.projectId = response.project_id;
		this.projectName = response.project_name;
		this.userId = response.user_id;
	}
}
