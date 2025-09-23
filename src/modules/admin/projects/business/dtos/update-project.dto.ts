import PutProjectResponse from "../../infrastructure/repositories/dtos/update-project";

export default class UpdateProjectResponseDTO {
    readonly id: string;
    readonly name: string;
    readonly created: Date;
    readonly userId: number;

    constructor(response: PutProjectResponse) {
        this.id = response.id;
        this.name = response.name;
        this.created = response.created;
        this.userId = response.user_id;
    }
}

export class UpdateProjectRequestDTO {
    readonly name: string;
}