import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsLocalRepository from "../plugins/questions.local.repository.plugin";

@injectable()
export default class ClearQuestionsLocalUseCase {

    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,
    ) {
    }

    public execute = (): Result<void> => {
        this._localRepository.clear();
        return Result.success();
    }
}