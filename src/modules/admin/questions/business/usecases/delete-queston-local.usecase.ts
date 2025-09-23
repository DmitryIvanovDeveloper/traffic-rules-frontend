import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import IQuestionsLocalRepository from "../plugins/questions.local.repository.plugin";
import { DeleteQuestionInput, DeleteQuestionOutput } from "./types/delete-questions";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import QuestionDeletedEvent from "../events/question-deleted-event";
import { ToastNotificationUseCases } from "@/modules/shared/notification/business/usecases/toast-notification.usecases";

@injectable()
export default class DeleteQuestionLocalUseCase extends BaseUseCase<DeleteQuestionInput, DeleteQuestionOutput> {

    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,

        @inject(SharedTYPES.ToastNotificationUseCases)
        private readonly _toastNotificationUseCases: ToastNotificationUseCases,
    ) {
        super()
    }

    public execute = async (input: DeleteQuestionInput): Promise<DeleteQuestionOutput> => {
        const questions = this._localRepository.getQuestions().value;
        if (!questions) {
            return Result.failure();
        }
        const filteredQuestions = questions.filter(question => question.id !== input.questionId);
        this._localRepository.storeQuestions(filteredQuestions);

        const question = this._localRepository.getQuestion().value
        if (question?.id === input.questionId) {
            this._localRepository.clearQuestion()
        }
        
        this._eventBus.publishAsync(new QuestionDeletedEvent(input.questionId));
        this._toastNotificationUseCases.success('Question deleted successful');
        return Result.success();
    }
}