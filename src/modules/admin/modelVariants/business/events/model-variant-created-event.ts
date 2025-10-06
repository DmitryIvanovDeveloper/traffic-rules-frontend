import { IEvent } from '@/infrastructure/events/event';

export default class ModelVariantCreatedEvent implements IEvent {
    constructor(public readonly variantId: string) {}
}
