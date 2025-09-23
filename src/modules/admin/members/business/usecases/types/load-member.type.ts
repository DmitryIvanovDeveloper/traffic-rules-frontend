import Result from "@/infrastructure/helpers/result";

export type LoadMemberInput = {
    id: number;
};
export type LoadMemberOutput = Result<void>;