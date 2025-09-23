import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import LoadQuestionsUseCase from "../../usecases/load-questons.usecase";
import LevelSelectedEvent from "@/modules/admin/levels/business/events/level-selected-event";

export default class LevelSelectedEventLoadQuestionsHandler
	implements IAsyncEventHandler<LevelSelectedEvent> {
	constructor(
		@inject(TYPES.LoadQuestionsUseCase)
		private readonly _loadPresentQuestionsUseCase: LoadQuestionsUseCase
	) { }

	canHandle(event: LevelSelectedEvent): boolean {
		return event instanceof LevelSelectedEvent;
	}

	async handleAsync(event: LevelSelectedEvent): Promise<void> {
		await this._loadPresentQuestionsUseCase.execute({ levelId: event.levelId });
	}
}
