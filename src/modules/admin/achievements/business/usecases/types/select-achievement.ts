import Result from "@/infrastructure/helpers/result";

export type SelectAchievementInput = {
    achievementId: string;
}

export type SelectAchievementOutput = Result<void>