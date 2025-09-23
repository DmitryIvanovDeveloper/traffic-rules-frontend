import { IAsyncEventHandler, ISyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import NextQuestionEvent from "../next-question-event";
import NextQuestionUseCase from "../../usecases/next-question.usecase";

export default class NextQuestionEventSetNextQuestionHandler implements ISyncEventHandler<NextQuestionEvent> {
    constructor(
        @inject(TYPES.NextQuestionUseCase)
        private readonly _nextQuestionUseCase: NextQuestionUseCase,
    ) {}

    public canHandle(event: NextQuestionEvent): boolean {
        return event instanceof NextQuestionEvent;
    }

    public handle(event: NextQuestionEvent): void {
        this._nextQuestionUseCase.execute();
    }
}
