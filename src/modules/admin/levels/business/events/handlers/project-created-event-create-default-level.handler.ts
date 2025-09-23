import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import ProjectCreatedEvent from "@/modules/admin/projects/business/events/project-created-event";
import CreateLevelUseCase from "../../usecases/create-level.usecase";

export default class ProjectCreatedEventCreateDefaultLevelHandler implements IAsyncEventHandler<ProjectCreatedEvent> {

	constructor(
		@inject(TYPES.CreateLevelUseCase)
		private readonly _createLevelUseCase: CreateLevelUseCase
	){}

	canHandle(event: ProjectCreatedEvent): boolean {
		return event instanceof ProjectCreatedEvent;
	}

	async handleAsync(event: ProjectCreatedEvent): Promise<void> {
		await this._createLevelUseCase.execute({ projectId: event.projectId, name: 'Новый уровень' });
	}
}
