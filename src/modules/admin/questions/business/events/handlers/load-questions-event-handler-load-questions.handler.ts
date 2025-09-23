import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import LoadQuestionsEvent from "../load-questions-event";
import LoadQuestionsUseCase from "../../usecases/load-questons.usecase";

export default class LoadQuestionsEventLoadQuestionsHandler implements IAsyncEventHandler<LoadQuestionsEvent> {
	constructor(
		@inject(TYPES.LoadQuestionsUseCase)
		private readonly _loadQuestionsUseCase: LoadQuestionsUseCase,
	) {}

	public canHandle(event: LoadQuestionsEvent): boolean {
		return event instanceof LoadQuestionsEvent;
	}

	public async handleAsync(event: LoadQuestionsEvent): Promise<void> {
		await this._loadQuestionsUseCase.execute({ levelId: event.levelId });
	}
}
