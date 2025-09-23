import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import { DeleteLevelsInput, DeleteLevelsOutput } from "./types/delete-levels.type";

@injectable()
export default class DeleteLevelsLocalByProjectIdUseCase  {
    constructor(
        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,
    ) {
    }

    public execute(input: DeleteLevelsInput): DeleteLevelsOutput {
        const projectId = input.projectId;
        const levels = this._localRepository.getLevels().value;

        const filtredLevels = levels.filter(level => level.projectId !== projectId);
        this._localRepository.storeLevels(filtredLevels);
       
        return Result.success();
    }
}
