import { IAsyncEventHandler, ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SelectQuestionUseCase from "../../usecases/select-question.usecase";
import IQuestionsLocalRepository from "../../plugins/questions.local.repository.plugin";
import QuestionDeletedEvent from "../question-deleted-event";

export default class QuestionDeletedEventSelectDefaultQuestionHandler implements IAsyncEventHandler<QuestionDeletedEvent> {

	constructor(
		@inject(TYPES.SelectQuestionUseCase)
		private readonly _selectQuestionUseCase: SelectQuestionUseCase,

		@inject(TYPES.QuestionsLocalRepository)
		private readonly _questionsLocalRepository: IQuestionsLocalRepository
	) { }

	public canHandle(event: QuestionDeletedEvent): boolean {
		return event instanceof QuestionDeletedEvent;
	}

	public async handleAsync(event: QuestionDeletedEvent): Promise<void> {
		const questions = this._questionsLocalRepository.getQuestions().value
		if (!questions.length) {
			return;
		}

		this._selectQuestionUseCase.execute({ questionId: questions[questions.length - 1].id });
	}
}
