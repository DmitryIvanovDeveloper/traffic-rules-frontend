import { ILevelLoadResponseDTO } from "../../../business/dtos/level.load.dto";
import GetLevelResponse from "./get-levels.response";
import GetProjectResponse from "./get-levels.response";

export function mapLevelResponseToDto(response: GetLevelResponse): ILevelLoadResponseDTO {
    const dto: ILevelLoadResponseDTO = {
        id: response.id,
        level: response.level,
        lang: response.lang_iso,
        projectId: response.project_id,
    }

    return dto;
}