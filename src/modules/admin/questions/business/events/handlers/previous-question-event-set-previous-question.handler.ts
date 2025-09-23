import { IAsyncEventHandler, ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import SaveProjectEvent from "@/modules/admin/projects/business/events/save-project-event";
import PreviousQuestionEvent from "../previous-question-event";
import PreviousQuestionUseCase from "../../usecases/previous-question.usecase";

export default class PreviousQuestionEventSetPreviousQuestionHandler implements ISyncEventHandler<PreviousQuestionEvent> {
    constructor(
        @inject(TYPES.PreviousQuestionUseCase)
        private readonly _previousQuestionUseCase: PreviousQuestionUseCase,
    ) {}
   

    public canHandle(event: PreviousQuestionEvent): boolean {
        return event instanceof PreviousQuestionEvent;
    }

    public handle(event: PreviousQuestionEvent): void {
        this._previousQuestionUseCase.execute();
    }
}
