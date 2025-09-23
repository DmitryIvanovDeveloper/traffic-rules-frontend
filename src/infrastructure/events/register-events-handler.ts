import { Container } from 'inversify';

const allHandlerModules = import.meta.glob('@/modules/admin/**/business/events/handlers/*.ts', { eager: true });

export function registerEventHandlers(container: Container) {
    for (const mod of Object.values(allHandlerModules)) {
        const exports = mod as Record<string, any>;

        for (const key in exports) {

            const HandlerClass = exports[key];

            if (typeof HandlerClass !== 'function') continue;
          
            const instance = container.resolve(HandlerClass) as {
                handleAsync?: (event: any) => Promise<void>;
                handle?: (event: any) => void;
            };

            const eventType = extractEventType(HandlerClass);
            if (!eventType) continue;

            if ('handleAsync' in instance) {
                container.bind(Symbol.for(`IAsyncEventHandler<${eventType}>`)).to(HandlerClass);
            } else if ('handle' in instance) {
                container.bind(Symbol.for(`ISyncEventHandler<${eventType}>`)).to(HandlerClass);
            }
        }
    }
}

function extractEventType(handlerClass: any): string | null {

    const name = handlerClass.name;

    return name.replace(/(Sync|Async)?Handler$/, '') + 'Event';
}
