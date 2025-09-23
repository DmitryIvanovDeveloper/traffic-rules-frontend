import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SaveProjectEvent from "@/modules/admin/projects/business/events/save-project-event";
import UpdateQuestionUseCase from "../../usecases/update-question.usecase";

export default class SaveProjectEventUpdateQuestionHandler implements IAsyncEventHandler<SaveProjectEvent> {
	constructor(
		@inject(TYPES.UpdateQuestionUseCase)
		private readonly _updateQuestionUseCase: UpdateQuestionUseCase,
	) {}

	canHandle(event: SaveProjectEvent): boolean {
		return event instanceof SaveProjectEvent;
	}

	async handleAsync(event: SaveProjectEvent): Promise<void> {
			await this._updateQuestionUseCase.execute();
	}
}
