import Result from "@/infrastructure/helpers/result";
import { LoadAchievementsResponseDTO } from "../dtos/load-achievements.dto";
import { CreateAchievementRequestDTO, CreateAchievementResponseDTO } from "../dtos/create-achievements.dto";

export default interface IAchievementsHttpRepository {
    delete(achievementId: string): Promise<Result<void>>;
    create(dto: CreateAchievementRequestDTO): Promise<Result<CreateAchievementResponseDTO>> 
    load(projectId: string): Promise<Result<ReadonlyArray<LoadAchievementsResponseDTO>>>
    
}
