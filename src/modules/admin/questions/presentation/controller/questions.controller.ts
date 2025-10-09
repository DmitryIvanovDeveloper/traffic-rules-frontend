import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as LevelTYPES } from "@/modules/admin/levels/types";
import SelectQuestionUseCase from "../../business/usecases/select-question.usecase";
import CreateQuestionUseCase from "../../business/usecases/create-question.usecase";
import ILevelsService from "@/modules/admin/levels/business/plugins/levels.service.plugin";
import Result from "@/infrastructure/helpers/result";
import QuestionNotCreatedError from "../../business/errors/questions-not-created.error";
import { CreateQuestionsOutput } from "../../business/usecases/types/create-question.type";
import IQuestionsLocalRepository from "../../business/plugins/questions.local.repository.plugin";
import NextQuestionUseCase from "../../business/usecases/next-question.usecase";
import PreviousQuestionUseCase from "../../business/usecases/previous-question.usecase";
import { ref } from "vue";
import DeleteQuestionUseCase from "../../business/usecases/delete-queston.usecase";
import ReorderQuestionsUseCase from "../../business/usecases/reorder-questions-order.usecase";

export default class QuestionsController {
    constructor(
        @inject(TYPES.SelectQuestionUseCase)
        private readonly _selectQueationUseCase: SelectQuestionUseCase,

        @inject(TYPES.CreateQuestionUseCase)
        private readonly _createQuestionUseCase: CreateQuestionUseCase,

        @inject(TYPES.DeleteQuestionUseCase)
        private readonly _deleteQuestionUseCase: DeleteQuestionUseCase,

        @inject(LevelTYPES.LevelsService)
        private readonly _levelService: ILevelsService,

        @inject(TYPES.QuestionsLocalRepository)
        private readonly _repository: IQuestionsLocalRepository,

        @inject(TYPES.NextQuestionUseCase)
        private readonly _nextQuestionUseCase: NextQuestionUseCase,

        @inject(TYPES.PreviousQuestionUseCase)
        private readonly _previousQuestionUseCase: PreviousQuestionUseCase,

        @inject(TYPES.ReorderQuestionsUseCase)
        private readonly _reorderQuestionsUseCase: ReorderQuestionsUseCase,
        
    ) {}

    public readonly creating = ref<boolean>(false);

    public selectQuestion = async (questionId: string): Promise<Result<void>> => {
        return await this._selectQueationUseCase.execute({ questionId });
    };

    public createQuestion = async (): Promise<CreateQuestionsOutput> => {
        this.creating.value = true;
        const result = this._levelService.getSelectedLevelId();
        if (!result.hasData()) {
            return Result.failure(new QuestionNotCreatedError());
        }

        const levelId = result.data;

        const createResult = await this._createQuestionUseCase.execute({ levelId });

        this.creating.value = false;

        return createResult;
    };

    public deleteQuestion = async (id: string): Promise<void> => {
        const result = this._repository.findQuestionById(id);
        if (!result.data) return;

        const question = result.data;
        const updatedQuestion = question.withUpdatedDeleting(true);
        this._repository.updateQuestions(updatedQuestion);

        await this._deleteQuestionUseCase.execute({ questionId: id });
    };

    public updateText(newText: string): void {
        const question = this._repository.getQuestion().value;
        if (!question) return;

        const updated = question.withUpdatedText(newText);
        this._repository.updateQuestions(updated);
    }

    public updatePoints(newPoints: number): void {
        const question = this._repository.getQuestion().value;
        if (!question) return;

        const updated = question.withUpdatedPoints(newPoints);
        this._repository.updateQuestions(updated);
    }

    public updateImage(newImage: string | null): void {
        const question = this._repository.getQuestion().value;
        if (!question) return;

        const updated = question.withUpdatedImage(newImage);
        this._repository.updateQuestions(updated);
    }

    public updateAnswerText(answerId: string, newText: string): void {
        const question = this._repository.getQuestion().value;
        if (!question) return;
        const updatedQuestion = question.withUpdatedAnswerText(answerId, newText);

        this._repository.updateQuestions(updatedQuestion);
    }

    public updateAnswerCorrect(answerId: string, correct: boolean): void {
        const question = this._repository.getQuestion().value;
        if (!question) return;

        const updatedQuestion = question.withUpdatedCorrectAnswer(
            answerId,
            correct
        );

        this._repository.updateQuestions(updatedQuestion);
    }

    public updatePublished(questionId: string, published: boolean): void {
        const questions = this._repository.getQuestions().value;
        if (!questions) return;

        const question = questions.find(q => q.id === questionId);
        if (!question) return;

        const updatedQuestion = question.withUpdatedPublished(published);
        this._repository.updateQuestions(updatedQuestion);
    }

    public changeAnswerOrders = (fromAnswerId: string, toAnswerId: string) => {
        const question = this._repository.getQuestion().value;
        if (!question) return;

        const updatedQuestion = question.withUpdatedAnswersOrder(toAnswerId, fromAnswerId);
        this._repository.updateQuestions(updatedQuestion);
    };

    public changeOrders = (fromId: string, toId: string): void => {
       this._reorderQuestionsUseCase.execute(fromId, toId);
    };

    public addNewAnswer() {
        const question = this._repository.getQuestion().value;
        if (!question) return;

        const updatedQuestion = question.withNewAnswer();
        this._repository.updateQuestions(updatedQuestion);
    }

    public removeAnswer(answerId: string) {
        const question = this._repository.getQuestion().value;
        if (!question) return;

        const updatedQuestion = question.withRemovedAnswer(answerId);
        this._repository.updateQuestions(updatedQuestion);
    }

    public next() {
        this._nextQuestionUseCase.execute();
    }

    public previous() {
        this._previousQuestionUseCase.execute();
    }
}
