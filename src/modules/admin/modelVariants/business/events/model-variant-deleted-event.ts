import { IEvent } from '@/infrastructure/events/event';

export default class ModelVariantDeletedEvent implements IEvent {
    constructor(public readonly variantId: string) {}
}
