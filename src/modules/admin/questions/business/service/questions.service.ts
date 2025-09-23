import { inject } from "inversify";
import IQuetionsService from "../plugins/questions-serivce.plugin";
import { TYPES } from "../../types";
import LoadQuestionsUseCase from "../usecases/load-questons.usecase";

export default class QuestionsService implements IQuetionsService {

    constructor(
        @inject(TYPES.LoadQuestionsUseCase)
        private readonly _loadQuestionsUseCase: LoadQuestionsUseCase,
    ) {}
    public findQuestionsIdByLevelId(id: string): Promise<ReadonlyArray<string>> {
        throw new Error("Method not implemented.");
    }

}