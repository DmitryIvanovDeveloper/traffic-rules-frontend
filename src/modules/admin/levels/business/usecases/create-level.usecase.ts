import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import Result from "@/infrastructure/helpers/result";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import Level from "../entities/level";
import LevelNotCreatedError from "../errors/level-not-created.error";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import LevelSelectedEvent from "../events/level-selected-event";
import ILevelsHttpRepository from "../plugins/levels.http.repository.plugin";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import SelectLevelUseCase from "./select-level.usecase";
import LevelCreatedEvent from "../events/level-created-event";
import { CreateLevelInput, CreateLevelOutput } from "./types/create-level.type";

@injectable()
export default class CreateLevelUseCase extends BaseUseCase<CreateLevelInput, CreateLevelOutput> {
    constructor(
        @inject(TYPES.LevelsHttpRepository)
        private readonly _repository: ILevelsHttpRepository,

        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,
    ) {
        super();
    }

    public async execute(input: CreateLevelInput): Promise<CreateLevelOutput> {
        const { name } = input;

        const projectId = input.projectId;

        const levelEntity = Level.create(name, "RU", projectId);
        const dto = levelEntity.toCreateRequest();

        const result = await this._repository.createLevel(dto);

        if (!result.hasData()) {
            return Result.failure(new LevelNotCreatedError());
        }

        const level = Level.toEntity(result.data);

        this._localRepository.addLevel(level);
        
        this._eventBus.publishAsync(new LevelCreatedEvent(level.id))
        return Result.success();
    }
}
