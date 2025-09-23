import Result from "@/infrastructure/helpers/result";

export type AssignMemberProjectInput = {
    projectId: string;
};
export type AssignMemberProjectOutput = Result<void>;