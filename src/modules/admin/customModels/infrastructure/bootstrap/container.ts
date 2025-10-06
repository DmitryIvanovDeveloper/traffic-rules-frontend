import { container } from '@/infrastructure/bootstrap/inversify.config';
import { TYPES } from '../../types';
import CustomModelsHttpRepository from '../repositories/custom-models.http.repository';
import CustomModelsLocalRepository from '../repositories/custom-models.local.repository';
import CreateCustomModelUseCase from '../../business/usecases/create-custom-model.usecase';
import CreateSimpleCustomModelUseCase from '../../business/usecases/create-simple-custom-model.usecase';
import UpdateCustomModelUseCase from '../../business/usecases/update-custom-model.usecase';
import DeleteCustomModelUseCase from '../../business/usecases/delete-custom-model.usecase';
import LoadCustomModelsUseCase from '../../business/usecases/load-custom-models.usecase';
import SelectCustomModelUseCase from '../../business/usecases/select-custom-model.usecase';
import ClearCustomModelsLocalUseCase from '../../business/usecases/clear-custom-models-local.usecase';
import CustomModelsController from '../../presentation/controller/custom-models.controller';
import CustomModelsPresenter from '../../presentation/presenter/custom-models.presenter';
import ProjectSelectedEventLoadCustomModelsHandler from '../../business/events/handlers/project-selected-event-load-custom-models.handler';
import ProjectSelectedEventClearLocalRepositoryHandler from '../../business/events/handlers/project-selected-event-clear-local-repository.handler';
import { IAsyncEventHandler, ISyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import ProjectSelectedEvent from '@/modules/admin/projects/business/events/project-selected-event';

// Repositories
container.bind(TYPES.CustomModelsHttpRepository).to(CustomModelsHttpRepository).inTransientScope();
container.bind(TYPES.CustomModelsLocalRepository).to(CustomModelsLocalRepository).inSingletonScope();

// Use Cases
container.bind(TYPES.CreateCustomModelUseCase).to(CreateCustomModelUseCase).inTransientScope();
container.bind(TYPES.CreateSimpleCustomModelUseCase).to(CreateSimpleCustomModelUseCase).inTransientScope();
container.bind(TYPES.UpdateCustomModelUseCase).to(UpdateCustomModelUseCase).inTransientScope();
container.bind(TYPES.DeleteCustomModelUseCase).to(DeleteCustomModelUseCase).inTransientScope();
container.bind(TYPES.LoadCustomModelsUseCase).to(LoadCustomModelsUseCase).inTransientScope();
container.bind(TYPES.SelectCustomModelUseCase).to(SelectCustomModelUseCase).inTransientScope();
container.bind(TYPES.ClearCustomModelsLocalUseCase).to(ClearCustomModelsLocalUseCase).inTransientScope();

// Presentation
container.bind(TYPES.CustomModelsController).to(CustomModelsController).inSingletonScope();
container.bind(TYPES.CustomModelsPresenter).to(CustomModelsPresenter).inSingletonScope();

// Event Handlers
container
    .bind<IAsyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandler)
    .to(ProjectSelectedEventLoadCustomModelsHandler)
    .inTransientScope();

container
    .bind<ISyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandlerSync)
    .to(ProjectSelectedEventClearLocalRepositoryHandler)
    .inTransientScope();
