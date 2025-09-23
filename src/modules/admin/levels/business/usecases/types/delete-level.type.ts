import Result from "@/infrastructure/helpers/result";

export type DeleteLevelInput = {
    levelId: string;
};

export type DeleteLevelOutput = Result<void>
