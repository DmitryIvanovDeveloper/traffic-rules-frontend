import { IEvent } from '@/infrastructure/events/event';

export default class CustomModelSelectedEvent implements IEvent {
    constructor(
        public readonly modelId: string
    ) {}
}










