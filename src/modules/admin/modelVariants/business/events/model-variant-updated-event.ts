import { IEvent } from '@/infrastructure/events/event';

export default class ModelVariantUpdatedEvent implements IEvent {
    constructor(public readonly variantId: string) {}
}
