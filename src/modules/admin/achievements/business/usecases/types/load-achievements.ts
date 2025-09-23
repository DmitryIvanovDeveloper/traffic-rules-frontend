import Result from "@/infrastructure/helpers/result";

export type LoadAchievementInput = {
    projectId: string;
}

export type LoadAchievementOutput = Result<void>