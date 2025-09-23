import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import { ToastNotificationUseCases } from "@/modules/shared/notification/business/usecases/toast-notification.usecases";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import LevelDeletedEvent from "../events/level-deleted-event";
import { DeleteLevelInput, DeleteLevelOutput } from "./types/delete-level.type";

@injectable()
export default class DeleteLevelLocalUseCase extends BaseUseCase<DeleteLevelInput, DeleteLevelOutput> {
    constructor(
        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,

        @inject(SharedTYPES.ToastNotificationUseCases)
        private readonly _toastNotificationUseCases: ToastNotificationUseCases,
    ) {
        super();
    }

    public async execute(input: DeleteLevelInput): Promise<DeleteLevelOutput> {
        const levelId = input.levelId;
        const levels = this._localRepository.getLevels().value;
        if (!levels) {
            return Result.failure();
        }
        const filteredLevels = levels.filter(level => level.id !== levelId);
        this._localRepository.storeLevels(filteredLevels);
        
        this._toastNotificationUseCases.success('Level successfully deleted');

        this._eventBus.publishAsync(new LevelDeletedEvent(levelId))

        const level = this._localRepository.getLevel().value;
        if (!level || level.id !== levelId) {
            return Result.success();
        }


        this._localRepository.clearLevel();
        return Result.success();
    }
}
