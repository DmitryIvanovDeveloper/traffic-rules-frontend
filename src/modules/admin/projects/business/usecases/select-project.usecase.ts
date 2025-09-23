import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import {
    SelectProjectInput,
    SelectProjectOutput,
} from "./types/select-project.type";
import ProjectNotSelectedError from "../errors/project-not-selected.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ProjectSelectedEvent from "../events/project-selected-event";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";

@injectable()
export default class SelectProjectUseCase extends BaseUseCase<SelectProjectInput, SelectProjectOutput> {
    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _localRepository: IProjectsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super();
    }

    public async execute(input: SelectProjectInput): Promise<SelectProjectOutput> {
        const result = await this._localRepository.findProjectById(input.projectId);
        if (!result.hasData()) {
            return Result.failure<void>(new ProjectNotSelectedError(input.projectId));
        }

        const project = result.data;
        this._localRepository.storeProject(project);

        this._eventBus.publish(new ProjectSelectedEvent(input.projectId))
        await this._eventBus.publishAsync(new ProjectSelectedEvent(input.projectId))

        return Result.success<void>();
    }
}
