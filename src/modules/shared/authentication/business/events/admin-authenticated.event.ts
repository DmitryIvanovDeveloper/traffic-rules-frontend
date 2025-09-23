import { IEvent } from "@/infrastructure/events/event";

export default class AdminAuthenticatedEvent implements IEvent {
    readonly type = 'AdminAuthenticatedEvent';
}