import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SaveProjectEvent from "@/modules/admin/projects/business/events/save-project-event";
import UpdateProjectUseCase from "../../usecases/update-project.usecase";

export default class SaveProjectEventUpdateProjectHandler implements IAsyncEventHandler<SaveProjectEvent> {
  constructor(
		@inject(TYPES.UpdateProjectUseCase)
		private readonly _updateQuestionUseCase: UpdateProjectUseCase,
	) {}

	canHandle(event: SaveProjectEvent): boolean {
		return event instanceof SaveProjectEvent;
	}

	async handleAsync(event: SaveProjectEvent): Promise<void> {
		await this._updateQuestionUseCase.execute({});
	}
}
