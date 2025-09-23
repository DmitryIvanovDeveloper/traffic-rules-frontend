import Result from "@/infrastructure/helpers/result";

export type DeleteAchievementsInput = {
    achievementId: string;
}

export type DeleteAchievementsOutput = Result<void>