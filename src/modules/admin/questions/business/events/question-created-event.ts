import { IEvent } from "@/infrastructure/events/event";

export default class QuestionCreatedEvent implements IEvent {
    readonly type = 'QuestionCreatedEvent';
    readonly questionId: string;

    constructor(questionId: string) {
        this.questionId = questionId;
    }
}
