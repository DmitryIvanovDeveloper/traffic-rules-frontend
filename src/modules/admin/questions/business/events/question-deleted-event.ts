import { IEvent } from "@/infrastructure/events/event";

export default class QuestionDeletedEvent implements IEvent {
    readonly type = 'QuestionDeletedEvent';
    public readonly questionId: string;

    constructor(questionId: string) {
        this.questionId = questionId;
    }
}
