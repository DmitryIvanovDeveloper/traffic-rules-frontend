import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { DeleteQuestionInput, DeleteQuestionOutput } from "./types/delete-questions";
import IQuestionsHttpRepository from "../plugins/questions.http.repository.plugin";
import DeleteQuestionLocalUseCase from "./delete-queston-local.usecase";
import QuestionNotDeletedError from "../errors/question-not-deleted.error";

@injectable()
export default class DeleteQuestionUseCase extends BaseUseCase<DeleteQuestionInput, DeleteQuestionOutput>{
    constructor(
        @inject(TYPES.QuestionsHttpRepository)
        private readonly _httpRepository: IQuestionsHttpRepository,

        @inject(TYPES.DeleteQuestionLocalUseCase)
        private readonly _deleteQuestionLocalUseCase: DeleteQuestionLocalUseCase,
    ) {
        super()
    }

    public execute = async (input: DeleteQuestionInput): Promise<DeleteQuestionOutput> => {
        const result = await this._httpRepository.delete(input.questionId);
        if (!result.isSuccess) {
            return Result.failure(new QuestionNotDeletedError(input.questionId));
        }
        
        this._deleteQuestionLocalUseCase.execute(input)
        return Result.success();
    }
}