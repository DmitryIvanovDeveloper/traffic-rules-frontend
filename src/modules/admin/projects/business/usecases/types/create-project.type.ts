import Result from "@/infrastructure/helpers/result";

export type CreateProjectInput = {
    name: string;
};
export type CreateProjectOutput = Result<void>;
