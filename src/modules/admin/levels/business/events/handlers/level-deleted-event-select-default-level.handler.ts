import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SelectLevelUseCase from "../../usecases/select-level.usecase";
import LevelDeletedEvent from "../level-deleted-event";
import ILevelsLocalRepository from "../../plugins/levels.local.repository.plugin";

export default class LevelDeletedEventSelectDefaultLevelHandler implements IAsyncEventHandler<LevelDeletedEvent> {
	constructor(
		@inject(TYPES.SelectLevelUseCase)
		private readonly _selectLevelUseCase: SelectLevelUseCase,

		@inject(TYPES.LevelsLocalRepository)
		private readonly _levelsLocalRepository: ILevelsLocalRepository
	){}

	public canHandle(event: LevelDeletedEvent): boolean {
		return event instanceof LevelDeletedEvent;
	}

	public async handleAsync(event: LevelDeletedEvent): Promise<void> {
		const levels = this._levelsLocalRepository.getLevels().value;
		if (!levels.length) return;

		await this._selectLevelUseCase.execute({ levelId: levels[levels.length - 1].id });
	}
}
