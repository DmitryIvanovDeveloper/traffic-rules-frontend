import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IQuestionsLocalRepository from '../plugins/questions.local.repository.plugin';

@injectable()
export default class ReorderQuestionsUseCase {
    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,
    ) {
    }

    public execute = (fromId: string, toId: string): void => {
        const questions = this._localRepository.getQuestions().value;
        if (!questions.length) {
            return;
        }

        const fromIndex = questions.findIndex(question => question.id === fromId);
        const toIndex = questions.findIndex(question => question.id === toId);

        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
            return;
        }

        const reorderedQuestions = [...questions];
        const [movedQuestion] = reorderedQuestions.splice(fromIndex, 1);
        reorderedQuestions.splice(toIndex, 0, movedQuestion);

        reorderedQuestions.forEach((question, index) => {
            const updatedQuestion = question.withUpdatedOrder(index + 1);
            this._localRepository.updateQuestions(updatedQuestion);
        });
    }
}