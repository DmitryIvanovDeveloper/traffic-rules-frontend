import { IEvent } from '@/infrastructure/events/event';

export default class CustomModelUpdatedEvent implements IEvent {
    constructor(
        public readonly modelId: string
    ) {}
}







