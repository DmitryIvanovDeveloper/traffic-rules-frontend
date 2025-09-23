import Result from "@/infrastructure/helpers/result";
import { ILevelCreateRequestDTO, ILevelCreateResponseDTO } from "../dtos/level.create.dto";
import { ILevelLoadResponseDTO } from "../dtos/level.load.dto";
import { ILevelUpdateRequestDTO, ILevelUpdateResponseDTO } from "../dtos/level.update.dto";

export default interface ILevelsHttpRepository {
    deleteLevel(levelId: string): Promise<Result<void>>;
    updateLevel(updateRequest: ILevelUpdateRequestDTO, levelId: string): Promise<Result<ILevelUpdateResponseDTO>>;
    createLevel(dto: ILevelCreateRequestDTO): Promise<Result<ILevelCreateResponseDTO>>;
    loadLevels(projectId: string): Promise<Result<Array<ILevelLoadResponseDTO>>>;
}