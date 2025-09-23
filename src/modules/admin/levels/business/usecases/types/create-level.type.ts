import Result from "@/infrastructure/helpers/result";

export type CreateLevelInput = {
    projectId: string;
    name: string;
};

export type CreateLevelOutput = Result<void>
