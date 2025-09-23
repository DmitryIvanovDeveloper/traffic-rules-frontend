import { EventBus } from './../../../../../infrastructure/events/event-bus';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadQuestionsOutput } from "./types/load-questions.type";
import { SelectQuestionInput, SelectQuestionsOutput } from "./types/select-question.type";
import QuestionNotSelectedError from "../errors/question-not-selected.error";
import IQuestionsLocalRepository from "../plugins/questions.local.repository.plugin";
import { IEventBus } from '@/infrastructure/events/event-bus.plugin';
import QuestionSelectedEvent from '../events/question-selected-event';

@injectable()
export default class SelectQuestionUseCase extends BaseUseCase<SelectQuestionInput, SelectQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _repository: IQuestionsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,
    ) {
        super()
    }

    public execute = async (input: SelectQuestionInput): Promise<LoadQuestionsOutput> => {
        const result = this._repository.findQuestionById(input.questionId);
        if (!result.hasData()) {
            return Result.failure(new QuestionNotSelectedError(input.questionId));
        }

        const question = result.data;
        this._repository.storeQuestion(question);
        
        this._eventBus.publishAsync(new QuestionSelectedEvent(question.id))
        return Result.success();
    }
}