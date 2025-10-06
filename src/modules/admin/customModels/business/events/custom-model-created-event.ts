import { IEvent } from '@/infrastructure/events/event';

export default class CustomModelCreatedEvent implements IEvent {
    constructor(
        public readonly modelId: string
    ) {}
}







