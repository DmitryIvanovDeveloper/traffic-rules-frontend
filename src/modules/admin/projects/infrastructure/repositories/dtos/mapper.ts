import ProjectDTO from "../../../business/dtos/create-project.dto";
import GetProjectResponse from "./get-project";

export function mapProjectResponseToDto(response: GetProjectResponse): ProjectDTO {
    const dto: ProjectDTO = {
        id: response.id,
        name:  response.name,
        created: response.created,
        userId:  response.user_id,
    }

    return dto;
}