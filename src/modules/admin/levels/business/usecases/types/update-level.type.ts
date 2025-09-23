import Result from "@/infrastructure/helpers/result";

export type UpdateLevelInput = {
    projectId: string;
};
export type UpdateLevelOutput = Result<void>
