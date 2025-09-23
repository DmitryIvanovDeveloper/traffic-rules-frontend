import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadLevelInput, LoadLevelOutput } from "./types/load-levels.type";
import LevelsNotLoadedError from "../errors/level-not-loaded.error";
import ILevelsHttpRepository from "../plugins/levels.http.repository.plugin";
import Level from "../entities/level";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import LevelsLoadedEvent from "../events/levels-loaded-event";
import { g } from "vitest/dist/chunks/suite.d.FvehnV49";

@injectable()
export default class LoadLevelsUseCase extends BaseUseCase<LoadLevelInput, LoadLevelOutput>{
    constructor(
        @inject(TYPES.LevelsHttpRepository)
        private readonly _repository: ILevelsHttpRepository,

        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,
    ) {
        super()
    }

    public execute = async (projectId: string): Promise<LoadLevelOutput> => {
        const result = await this._repository.loadLevels(projectId);
        if (!result.hasData()) {
            return Result.failure(new LevelsNotLoadedError());
        }

        const levels = result.data.map(dto => Level.toEntity(dto));
        console.log(result)
        this._localRepository.storeLevels(levels);
        
        this._eventBus.publish(new LevelsLoadedEvent(levels.map(level => ({ id: level.id, name: level.name }))));
        return Result.success();
    }
}