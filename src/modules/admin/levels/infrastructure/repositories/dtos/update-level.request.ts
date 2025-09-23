import { ILevelUpdateRequestDTO } from "../../../business/dtos/level.update.dto";

export class UpdateLevelRequest {
    readonly level: string;
    readonly lang_iso: string;
    readonly project_id: string;

    constructor(dto: ILevelUpdateRequestDTO) {
        this.level = dto.level;
        this.lang_iso = dto.lang,
        this.project_id = dto.projectId
    }
}

export class UpdateLevelResponse {
  
}