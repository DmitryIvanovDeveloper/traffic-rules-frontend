import { ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import QuestionsLoadedEvent from "../questions-loaded-event";
import SelectQuestionUseCase from "../../usecases/select-question.usecase";

export default class QuestionLoadedEventSelectQuestionHandler implements ISyncEventHandler<QuestionsLoadedEvent> {

	constructor(
		@inject(TYPES.SelectQuestionUseCase)
		private readonly _selectQuestionUseCase: SelectQuestionUseCase
	) { }

	public canHandle(event: QuestionsLoadedEvent): boolean {
		return event instanceof QuestionsLoadedEvent;
	}

	public handle(event: QuestionsLoadedEvent): void {
		if (!event.questions.length) {
			return;
		}

		this._selectQuestionUseCase.execute({ questionId: event.questions[0].id });
	}
}
