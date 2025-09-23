import { Container } from 'inversify';
import IHttpClient from '../api/http/http.interface';
import HttpClient from '../api/http/http-client';
import { NAMES, TYPES } from './types';
import HttpClientMock from '../api/http/http-clinet.mock';
import 'reflect-metadata';
import { ToastNotificationUseCases } from '@/modules/shared/notification/business/usecases/toast-notification.usecases';
import AuthTokenUseCases from '@/modules/shared/authStorage/business/usecases/auth-token.usecases';
import { IAuthStorageRepository } from '@/modules/shared/authStorage/business/plugins/auth-storage.interface';
import { CookieStorageRespository } from '@/modules/shared/authStorage/infrastructure/coockie-storage.repository';
import { LocalStorageRespository } from '@/modules/shared/authStorage/infrastructure/local-storage.repository';
import { SessionStorageRespository } from '@/modules/shared/authStorage/infrastructure/session-storage.repository';
import { IEventBus } from '../events/event-bus.plugin';
import { EventBus } from '../events/event-bus';

export const enum Enviroment {
    development = 'development',
    local = 'local',
}

const container = new Container();

container.bind<IHttpClient>(TYPES.HttpClient).to(HttpClient);

// if (import.meta.env.VITE_APP_ENV === Enviroment.development) {
// } else {
//     container.bind<IHttpClient>(TYPES.HttpClient).to(HttpClientMock);
// }

container.bind<ToastNotificationUseCases>(TYPES.ToastNotificationUseCases).to(ToastNotificationUseCases).inSingletonScope();
container.bind<AuthTokenUseCases>(TYPES.AuthTokenUseCases).to(AuthTokenUseCases).inTransientScope();

container
    .bind<IAuthStorageRepository>(TYPES.AuthStorageRepository)
    .to(LocalStorageRespository)
    .inTransientScope()
    .whenTargetNamed(NAMES.LocalStorageRespository)
;

container
    .bind<IAuthStorageRepository>(TYPES.AuthStorageRepository)
    .to(SessionStorageRespository)
    .inTransientScope()
    .whenTargetNamed(NAMES.SessionStorageRespository)
;

container
    .bind<IAuthStorageRepository>(TYPES.AuthStorageRepository)
    .to(CookieStorageRespository)
    .inTransientScope()
    .whenTargetNamed(NAMES.CookieStorageRespository)
;


container.bind<IEventBus>(TYPES.EventBus).to(EventBus).inSingletonScope();
container.bind<Container>(Container).toConstantValue(container);

export { container };
