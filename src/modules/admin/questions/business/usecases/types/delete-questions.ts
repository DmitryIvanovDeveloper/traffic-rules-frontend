import Result from "@/infrastructure/helpers/result";

export type DeleteQuestionInput = {
    questionId: string;
};

export type DeleteQuestionOutput = Result<void>;

export type DeleteQuestionsInput = {
    levelId: string;
};

export type DeleteQuestionsOutput = Result<void>;

