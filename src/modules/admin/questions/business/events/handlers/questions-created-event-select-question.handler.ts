import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SelectQuestionUseCase from "../../usecases/select-question.usecase";
import QuestionCreatedEvent from "../question-created-event";

export default class QuestionCreatedEventSelectQuestionHandler implements ISyncEventHandler<QuestionCreatedEvent> {

	constructor(
		@inject(TYPES.SelectQuestionUseCase)
		private readonly _selectQuestionUseCase: SelectQuestionUseCase
	) { }

	public canHandle(event: QuestionCreatedEvent): boolean {
		return event instanceof QuestionCreatedEvent;
	}

	public handle(event: QuestionCreatedEvent): void {
		

		this._selectQuestionUseCase.execute({ questionId: event.questionId });
	}
}
