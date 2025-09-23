import Result from "@/infrastructure/helpers/result";

export type DeleteLevelsInput = {
    projectId: string;
}

export type DeleteLevelsOutput = Result<void>
