import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsHttpRepository from "../plugins/questions.http.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateQuestionInput, CreateQuestionsOutput } from "./types/create-question.type";
import Question from "../entities/question";
import QuestionNotCreatedError from "../errors/questions-not-created.error";
import QuestionsLocalRepository from "../../infrastructure/repositories/questions.local.repository";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import QuestionCreatedEvent from "../events/question-created-event";

@injectable()
export default class CreateQuestionUseCase extends BaseUseCase<CreateQuestionInput, CreateQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsHttpRepository)
        private readonly _repository: IQuestionsHttpRepository,

        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: QuestionsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,
    ) {
        super()
    }

    public execute = async (input: CreateQuestionInput): Promise<CreateQuestionsOutput> => {

        const questions = this._localRepository.getQuestions().value;
        if (!questions) {
            return Result.failure();
        }
        
        const order = questions.length > 0
        ? Math.max(...questions.map(question => question.order)) + 1
        : 1;
        const levelId = input.levelId;

        const request = Question.create({levelId, order}).toCreateRequest();

        const result = await this._repository.save(request);
        if (!result.hasData()) {
            return Result.failure(new QuestionNotCreatedError())
        }

        const question = Question.toEntity(result.data)
      
        this._localRepository.addQuestion(question);

        this._eventBus.publish(new QuestionCreatedEvent(question.id));
        
        return Result.success();
    }
}