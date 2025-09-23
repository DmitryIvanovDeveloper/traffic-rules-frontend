import Result from "@/infrastructure/helpers/result";

export type CreateAchievementInput = {
    projectId: string;
}

export type CreateAchievementOutput = Result<void>