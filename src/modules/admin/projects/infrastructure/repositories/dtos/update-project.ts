import { UpdateProjectRequestDTO } from "../../../business/dtos/update-project.dto";

export class PutProjectRequest {
    name: string;

    constructor(dto: UpdateProjectRequestDTO) {
        this.name = dto.name;
    }
}

export default interface PutProjectResponse {
    id: string;
    name: string;
    created: Date;
    user_id: number;
}