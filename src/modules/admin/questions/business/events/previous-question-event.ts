import { IEvent } from "@/infrastructure/events/event";

export default class PreviouseQuestionEvent implements IEvent {
    readonly type = 'PreviouseQuestionEvent';

}
