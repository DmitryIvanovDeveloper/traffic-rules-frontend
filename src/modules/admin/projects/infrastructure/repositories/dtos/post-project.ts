import { CreateProjectRequestDTO } from "../../../business/dtos/create-project.dto";

export class PostProjectRequest {
    readonly name: string;

    constructor(request: CreateProjectRequestDTO) {
        this.name = request.name;
    }
}

export interface PostProjectResponse {
    id: string;
    name: string;
    created: Date;
    user_id: number;
}