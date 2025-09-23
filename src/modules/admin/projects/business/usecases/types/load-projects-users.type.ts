import Result from "@/infrastructure/helpers/result";

export type LoadProjectUsersInput = {
    projectId: string;
};

export type LoadProjectUsersOutput = Result<void>;
