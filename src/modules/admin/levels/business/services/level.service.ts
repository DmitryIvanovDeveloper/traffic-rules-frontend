import Result from "@/infrastructure/helpers/result";
import ILevelsService from "../plugins/levels.service.plugin";
import { inject } from "inversify";
import { TYPES } from "../../types";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import LevelNotSelectedError from "../errors/level-not-selected.error";

export default class LevelService implements ILevelsService {

    constructor(
        @inject(TYPES.LevelsLocalRepository)
        private readonly _repository: ILevelsLocalRepository
    ){}

    public getSelectedLevelId(): Result<string> {
        const level = this._repository.getLevel();
        if (!level.value) {
            return Result.failure(new LevelNotSelectedError());
        }

        return Result.success(level.value.id);
    }

}