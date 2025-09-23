import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { UpdateQuestionOutput, UpdateQuestionInput } from "./types/update-question.type";
import IQuestionsLocalRepository from '../plugins/questions.local.repository.plugin';
import SelectQuestionUseCase from "./select-question.usecase";

@injectable()
export default class NextQuestionUseCase {
    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _repository: IQuestionsLocalRepository,

        @inject(TYPES.SelectQuestionUseCase)
        private readonly _selectQuestionUseCase: SelectQuestionUseCase,
    ) {
    }

    public execute = (): Result<void> => {
        const questions = this._repository.getQuestions().value;
        const question = this._repository.getQuestion().value;

        if (!questions.length || !question) {
            return Result.failure();
        }

        if (!question) {
            return Result.failure();
        }

        const index = questions.findIndex(q => q.id === question.id);

        const nextIndex = (index + 1) % questions.length;

        const nextQuestion = questions[nextIndex];

        this._selectQuestionUseCase.execute({ questionId: nextQuestion.id });

        return Result.success();
    }
}
