import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsHttpRepository from "../plugins/questions.http.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { UpdateQuestionOutput, UpdateQuestionInput } from "./types/update-question.type";
import QuestionNotUpdatedError from '../errors/questions-not-updated.error';
import IQuestionsLocalRepository from '../plugins/questions.local.repository.plugin';
import Question from "../entities/question";
import QuestionError from "../errors/questions.error";

@injectable()
export default class UpdateQuestionUseCase extends BaseUseCase<UpdateQuestionInput, UpdateQuestionOutput>{
    constructor(
        @inject(TYPES.QuestionsHttpRepository)
        private readonly _repository: IQuestionsHttpRepository,

        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,
    ) {
        super()
    }

    public execute = async (input: UpdateQuestionInput): Promise<UpdateQuestionOutput> => {
        const questions = this._localRepository.getQuestions().value;
        if (!questions) {
            return Result.failure(new QuestionNotUpdatedError())
        }

        const editedQuestions = questions.filter(question => question.edited);

        let questionsErrors = new Array<QuestionError>();
        const validatedQuestions = new Array<Question>();
        
        editedQuestions.forEach(question => {
            const updatedQuestion = question.withUpdatedShowErrors();
            this._localRepository.updateQuestions(updatedQuestion);

            const errors = question.validate();
            
            if (errors.length) {
                questionsErrors = [...questionsErrors, ...errors];
                return;
            }

            validatedQuestions.push(question);
        })
        
        await Promise.all(validatedQuestions.map(async question => {
            
            const updateRequest = question.toUpdateRequest();
            const result = await this._repository.update(question.id, updateRequest);
            if (!result.hasData()) {
                return Result.failure(new QuestionNotUpdatedError(question.id))
            }

            const updatedQuestion = Question.toEntity(result.data);
            this._localRepository.updateQuestions(updatedQuestion);
        }))

        return Result.success();
    }
}