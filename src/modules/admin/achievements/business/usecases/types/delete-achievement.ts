import Result from "@/infrastructure/helpers/result";

export type DeleteAchievementInput = {
    achievementId: string;
}

export type DeleteAchievementOutput = Result<void>