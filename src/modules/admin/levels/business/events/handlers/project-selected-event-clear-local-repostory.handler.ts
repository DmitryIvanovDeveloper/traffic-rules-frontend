import { IAsyncEventHandler, ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import ProjectSelectedEvent from "@/modules/admin/projects/business/events/project-selected-event";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import ClearLevelsLocalUseCase from "../../usecases/clear-levels-local.usecase";

export default class ProjectSelectedEventClearLocalRepositoryHandler implements ISyncEventHandler<ProjectSelectedEvent> {
	constructor(
		@inject(TYPES.ClearLevelsLocalUseCase)
		private readonly _clearLevelsLocalUseCase: ClearLevelsLocalUseCase
	){

	}
	public canHandle(event: ProjectSelectedEvent): boolean {
		return event instanceof ProjectSelectedEvent;
	}

	public handle(event: ProjectSelectedEvent): void {
		this._clearLevelsLocalUseCase.execute();
	}
}
