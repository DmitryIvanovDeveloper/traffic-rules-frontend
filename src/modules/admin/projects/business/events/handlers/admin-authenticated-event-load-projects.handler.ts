import { inject } from 'inversify';
import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import AdminAuthenticatedEvent from "@/modules/shared/authentication/business/events/admin-authenticated.event";
import { TYPES } from '../../../types';
import LoadProjectsUseCase from '../../usecases/load-projects.usecase';

export default class AdminAuthenticatedEventLaodProjectsHandle implements IAsyncEventHandler<AdminAuthenticatedEvent> {

  constructor(
    @inject(TYPES.LoadPresentProjectsUseCase)
    private readonly _loadPresentProjectsUseCase: LoadProjectsUseCase
  ){}

  canHandle(event: AdminAuthenticatedEvent): boolean {
    return event instanceof AdminAuthenticatedEvent;
  }

  async handleAsync(event: AdminAuthenticatedEvent): Promise<void> {
      await this._loadPresentProjectsUseCase.execute();
  }
}
