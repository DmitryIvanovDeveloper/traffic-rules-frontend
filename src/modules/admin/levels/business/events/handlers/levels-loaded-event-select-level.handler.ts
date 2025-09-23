import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SelectLevelUseCase from "../../usecases/select-level.usecase";
import LevelsLoadedEvent from "../levels-loaded-event";

export default class LevelsLoadedEventSelectLevelHandler implements ISyncEventHandler<LevelsLoadedEvent> {

	constructor(
		@inject(TYPES.SelectLevelUseCase)
		private readonly _selectLevelUseCase: SelectLevelUseCase
	){}

	public canHandle(event: LevelsLoadedEvent): boolean {
		return event instanceof LevelsLoadedEvent;
	}

	public handle(event: LevelsLoadedEvent): void {
		if (!event.levels.length) {
			return;
		}

		this._selectLevelUseCase.execute({ levelId: event.levels[0].id });
	}
}
