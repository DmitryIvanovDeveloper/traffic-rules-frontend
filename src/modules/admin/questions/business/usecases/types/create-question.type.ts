import Result from "@/infrastructure/helpers/result";

export type CreateQuestionInput = {
    levelId: string;
};

export type CreateQuestionsOutput = Result<void>;
