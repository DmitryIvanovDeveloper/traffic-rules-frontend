import { IEvent } from '@/infrastructure/events/event';

export default class CustomModelDeletedEvent implements IEvent {
    constructor(
        public readonly modelId: string
    ) {}
}







