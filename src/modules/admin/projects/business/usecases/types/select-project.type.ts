import Result from "@/infrastructure/helpers/result";

export type SelectProjectInput = {
    projectId: string;
};
export type SelectProjectOutput = Result<void>;
