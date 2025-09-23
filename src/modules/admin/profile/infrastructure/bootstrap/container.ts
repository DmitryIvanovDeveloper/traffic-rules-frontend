import AdminAuthenticatedEvent from '@/modules/shared/authentication/business/events/admin-authenticated.event';
import AdminAuthenticatedEventCreateProfileHandler from '../../business/events/handlers/admin-authenticated-event-load-profile.handler';
import { TYPES } from '../../types';


import { container } from '@/infrastructure/bootstrap/inversify.config';
import { IAsyncEventHandler } from '@/infrastructure/events/events-handler.plugin';

container
    .bind<IAsyncEventHandler<AdminAuthenticatedEvent>>(TYPES.AdminAuthenticatedEventHandler)
    .to(AdminAuthenticatedEventCreateProfileHandler)
    .inTransientScope()
;
