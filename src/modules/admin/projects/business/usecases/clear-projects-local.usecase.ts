import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { DeleteProjectInput } from "./types/delete-project.type";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";

@injectable()
export default class ClearProjectsLocalUseCase  {
    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _localRepository: IProjectsLocalRepository,
    ) {
    }

    public execute = (input: DeleteProjectInput): Result<void> => {
        this._localRepository.clear();
        return Result.success();
    }
}