import { IAsyncEventHandler, ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import ProjectDeletedEvent from "@/modules/admin/projects/business/events/project-deleted-event";
import DeleteLevelsLocalByProjectIdUseCase from "../../usecases/delete-levels-local-by-project-id.usecase";

export default class ProjectDeletedEventDeleteLevelsLocalHandler implements IAsyncEventHandler<ProjectDeletedEvent> {

	constructor(
		@inject(TYPES.DeleteLevelsLocalByProjectIdUseCase)
		private readonly _deleteLevelsLocalByProjectIdUseCase: DeleteLevelsLocalByProjectIdUseCase
	){}

	public canHandle(event: ProjectDeletedEvent): boolean {
		return event instanceof ProjectDeletedEvent;
	}

	public async handleAsync (event: ProjectDeletedEvent): Promise<void> {
		this._deleteLevelsLocalByProjectIdUseCase.execute({ projectId: event.projectId });
	}
}
