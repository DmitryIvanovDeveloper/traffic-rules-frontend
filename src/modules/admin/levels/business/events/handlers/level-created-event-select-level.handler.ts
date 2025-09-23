import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import LevelCreatedEvent from "../level-created-event";
import SelectLevelUseCase from "../../usecases/select-level.usecase";

export default class LevelCreatedEventSelectLevelHandler implements IAsyncEventHandler<LevelCreatedEvent> {

	constructor(
		@inject(TYPES.SelectLevelUseCase)
		private readonly _selectLevelUseCase: SelectLevelUseCase
	){}

	canHandle(event: LevelCreatedEvent): boolean {
		return event instanceof LevelCreatedEvent;
	}

	async handleAsync(event: LevelCreatedEvent): Promise<void> {
		await this._selectLevelUseCase.execute({ levelId: event.levelId });
	}
}
