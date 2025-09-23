import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsLocalRepository from '../plugins/questions.local.repository.plugin';
import SelectQuestionUseCase from "./select-question.usecase";

@injectable()
export default class PreviousQuestionUseCase {
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

        const index = questions.findIndex(q => q.id === question.id);

        const prevIndex = (index - 1 + questions.length) % questions.length;

        const prevQuestion = questions[prevIndex];

        this._selectQuestionUseCase.execute({ questionId: prevQuestion.id });

        return Result.success();
    }
}
