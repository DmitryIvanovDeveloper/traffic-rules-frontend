import Result from "@/infrastructure/helpers/result";

export type SelectQuestionInput = {
    questionId: string;
};

export type SelectQuestionsOutput = Result<void>;
