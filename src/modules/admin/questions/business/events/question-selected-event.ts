import { IEvent } from "@/infrastructure/events/event";

export default class QuestionSelectedEvent implements IEvent {
    readonly type = 'QuestionSelectedEvent';
    readonly questionId: string;

    constructor(questionId: string) {
        this.questionId = questionId;
    }
}
