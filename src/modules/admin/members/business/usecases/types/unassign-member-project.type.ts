import Result from "@/infrastructure/helpers/result";

export type UnAssignMemberProjectInput = {
    projectId: string;
};
export type UnAssignMemberProjectOutput = Result<void>;