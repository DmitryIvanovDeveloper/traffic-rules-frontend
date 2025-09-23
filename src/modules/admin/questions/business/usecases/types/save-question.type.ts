import Result from "@/infrastructure/helpers/result";

export type SaveQuestionInput = {
    levelId: string;
};

export type SaveQuestionsOutput = Result<void>;
