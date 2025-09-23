import Result from "@/infrastructure/helpers/result";

export type LoadQuestionsInput = {
    levelId: string;
};

export type LoadQuestionsOutput = Result<void>;
