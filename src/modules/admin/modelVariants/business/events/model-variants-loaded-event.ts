import { IEvent } from "@/infrastructure/events/event";

export default class ModelVariantsLoadedEvent implements IEvent {
    readonly type = 'ModelVariantsLoadedEvent';

    constructor(
        public readonly variants: ReadonlyArray<{ id: string; name: string }>
    ) {}
}



