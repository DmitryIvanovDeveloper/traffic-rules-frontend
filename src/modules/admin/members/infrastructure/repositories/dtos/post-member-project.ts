
export class PostMemberProjectRequest {
    readonly user_id: number;
    readonly project_id: string;

    constructor(projectId: string, userId: number) {
        this.project_id = projectId;
        this.user_id = userId;
    }
}

export interface PostMemberProjectResponse {
    readonly id: number;
    readonly user_id: number;
    readonly project_id: string;
}

