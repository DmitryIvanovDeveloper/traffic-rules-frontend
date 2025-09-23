import Result from "@/infrastructure/helpers/result";

export type DeleteProjectInput = {
    projectId: string;
};
export type DeleteProjectOutput = Result<void>;
