import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import LevelCreatedEvent from "@/modules/admin/levels/business/events/level-created-event";
import DeleteQuestionsLocalUseCase from "../../usecases/delete-questons-local.usecase";
import LevelDeletedEvent from "@/modules/admin/levels/business/events/level-deleted-event";

export default class LevelDeletedEventDeleteQuestionsLocalQuestionHandler
	implements IAsyncEventHandler<LevelDeletedEvent> {
	constructor(
		@inject(TYPES.DeleteQuestionsLocalUseCase)
		private readonly _deleteQuestionsLocalUseCase: DeleteQuestionsLocalUseCase
	) { }

	public canHandle(event: LevelDeletedEvent): boolean {
		return event instanceof LevelDeletedEvent;
	}

	public async handleAsync(event: LevelDeletedEvent): Promise<void> {
		await this._deleteQuestionsLocalUseCase.execute({ levelId: event.levelId });
	}
}
