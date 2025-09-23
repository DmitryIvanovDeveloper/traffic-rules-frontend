import { IEvent } from "@/infrastructure/events/event";

export default class NextQuestionEvent implements IEvent {
    readonly type = 'NextQuestionEvent';

}
