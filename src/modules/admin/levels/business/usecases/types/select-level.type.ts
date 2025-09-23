import Result from "@/infrastructure/helpers/result";

export type SelectLevelInput = {
    levelId: string;
};

export type SelectLevelOutput = Result<void>
