import { IAsyncEventHandler, ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import ProjectSelectedEvent from "@/modules/admin/projects/business/events/project-selected-event";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import IQuestionsLocalRepository from "../../plugins/questions.local.repository.plugin";

export default class ProjectSelectedEventClearLocalRepositoryHandler implements ISyncEventHandler<ProjectSelectedEvent> {
	constructor(
		@inject(TYPES.QuestionsLocalRepository)
		private readonly _questionsLocalRepository: IQuestionsLocalRepository
	){

	}
	public canHandle(event: ProjectSelectedEvent): boolean {
		return event instanceof ProjectSelectedEvent;
	}

	public handle(event: ProjectSelectedEvent): void {
		this._questionsLocalRepository.clear();
		this._questionsLocalRepository.storeQuestions([]);
	}
}
