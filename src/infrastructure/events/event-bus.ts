import { injectable, inject, Container } from 'inversify';
import { IAsyncEventHandler, ISyncEventHandler } from './events-handler.plugin';
import { IEventBus } from './event-bus.plugin';
import { IEvent } from './event';
import { TYPES } from '../bootstrap/types';
import { ToastNotificationUseCases } from '@/modules/shared/notification/business/usecases/toast-notification.usecases';
import { container } from '@infrastructure/bootstrap/inversify.config'

@injectable()
export class EventBus implements IEventBus {
    private handlers: Map<string, (ISyncEventHandler<IEvent> | IAsyncEventHandler<IEvent>)[]> = new Map();
    
    constructor(
        @inject(TYPES.ToastNotificationUseCases) 
        private _toastNotificationUseCases: ToastNotificationUseCases
    ) 
    {}

    publish<TEvent extends IEvent>(event: TEvent): void {
        const eventType = (event as any).type ?? event.constructor.name;
        const handlers = this.handlers.get(eventType) || [];

        for (const handler of handlers) {
            if ('handle' in handler && (handler as ISyncEventHandler<TEvent>).canHandle(event)) {
                (handler as ISyncEventHandler<TEvent>).handle(event);
            }
        }

        const fromContainer = container.getAll<ISyncEventHandler<TEvent>>(
            Symbol.for(`ISyncEventHandler<${eventType}>`),
        );

        for (const handler of fromContainer) {
            if (!handler.canHandle(event)) {
                return;
            }
            handler.handle(event);
            // this._toastNotificationUseCases.success(`${eventType}`);
        }
    }

    async publishAsync<TEvent extends IEvent>(event: TEvent): Promise<void> {

        const eventType = (event as any).type ?? event.constructor.name;
        const handlers = this.handlers.get(eventType) || [];
        const tasks: Promise<void>[] = [];

        for (const handler of handlers) {

            if ('handleAsync' in handler && (handler as IAsyncEventHandler<TEvent>).canHandle(event)) {
                tasks.push((handler as IAsyncEventHandler<TEvent>).handleAsync(event));
            }
        }

        const asyncHandlers = container.getAll<IAsyncEventHandler<TEvent>>(
            Symbol.for(`IAsyncEventHandler<${eventType}>`),
        );

        for (const handler of asyncHandlers) {
            if (handler.canHandle(event)) {
                tasks.push(handler.handleAsync(event));
                // this._toastNotificationUseCases.success(`${eventType}`);
            }
        }

        if (tasks.length > 0) await Promise.all(tasks);
    }

    subscribe<TEvent extends IEvent>(handler: ISyncEventHandler<TEvent> | IAsyncEventHandler<TEvent>): void {
        const eventType = this.extractGenericType(handler);
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, []);
        }
        this.handlers.get(eventType)!.push(handler as any);
    }

    unsubscribe<TEvent extends IEvent>(handler: ISyncEventHandler<TEvent> | IAsyncEventHandler<TEvent>): void {
        const eventType = this.extractGenericType(handler);
        const list = this.handlers.get(eventType);
        if (list) {
            const index = list.indexOf(handler as any);
            if (index > -1) list.splice(index, 1);
        }
    }

    private extractGenericType(handler: any): string {
        const name = handler.constructor.name;
        const match = /Handler<(.*?)>/.exec(name);
        return match ? match[1] : 'UnknownEvent';
    }
}
