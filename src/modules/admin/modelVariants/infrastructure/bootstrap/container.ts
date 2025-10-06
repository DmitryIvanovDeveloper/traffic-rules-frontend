import { container } from '@/infrastructure/bootstrap/inversify.config';
import { TYPES } from '../../types';
import ModelVariantsHttpRepository from '../repositories/model-variants.http.repository';
import ModelVariantsLocalRepository from '../repositories/model-variants.local.repository';
import CreateModelVariantUseCase from '../../business/usecases/create-model-variant.usecase';
import UpdateModelVariantUseCase from '../../business/usecases/update-model-variant.usecase';
import DeleteModelVariantUseCase from '../../business/usecases/delete-model-variant.usecase';
import DeleteModelVariantsByModelIdUseCase from '../../business/usecases/delete-model-variants-by-model-id.usecase';
import LoadModelVariantsUseCase from '../../business/usecases/load-model-variants.usecase';
import SelectModelVariantUseCase from '../../business/usecases/select-model-variant.usecase';
import ClearModelVariantsLocalUseCase from '../../business/usecases/clear-model-variants-local.usecase';
import ModelVariantsController from '../../presentation/controller/model-variants.controller';
import ModelVariantsPresenter from '../../presentation/presenter/model-variants.presenter';
import { IAsyncEventHandler, ISyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import CustomModelSelectedEvent from '@/modules/admin/customModels/business/events/custom-model-selected-event';
import ProjectSelectedEvent from '@/modules/admin/projects/business/events/project-selected-event';
import CustomModelSelectedEventLoadModelVariantsHandler from '../../business/events/handlers/custom-model-selected-event-load-model-variants.handler';
import ProjectSelectedEventClearLocalRepositoryHandler from '../../business/events/handlers/project-selected-event-clear-local-repository.handler';
import ModelVariantsLoadedEvent from '../../business/events/model-variants-loaded-event';
import ModelVariantsLoadedEventSelectFirstHandler from '../../business/events/handlers/model-variants-loaded-event-select-first.handler';

// Repositories
container.bind(TYPES.ModelVariantsHttpRepository).to(ModelVariantsHttpRepository).inTransientScope();
container.bind(TYPES.ModelVariantsLocalRepository).to(ModelVariantsLocalRepository).inSingletonScope();

// Use Cases
container.bind(TYPES.CreateModelVariantUseCase).to(CreateModelVariantUseCase).inTransientScope();
container.bind(TYPES.UpdateModelVariantUseCase).to(UpdateModelVariantUseCase).inTransientScope();
container.bind(TYPES.DeleteModelVariantUseCase).to(DeleteModelVariantUseCase).inTransientScope();
container.bind(TYPES.DeleteModelVariantsByModelIdUseCase).to(DeleteModelVariantsByModelIdUseCase).inTransientScope();
container.bind(TYPES.LoadModelVariantsUseCase).to(LoadModelVariantsUseCase).inTransientScope();
container.bind(TYPES.SelectModelVariantUseCase).to(SelectModelVariantUseCase).inTransientScope();
container.bind(TYPES.ClearModelVariantsLocalUseCase).to(ClearModelVariantsLocalUseCase).inTransientScope();

// Presentation Layer
container.bind(TYPES.ModelVariantsController).to(ModelVariantsController).inTransientScope();
container.bind(TYPES.ModelVariantsPresenter).to(ModelVariantsPresenter).inTransientScope();

// Event Handlers
container
    .bind<IAsyncEventHandler<CustomModelSelectedEvent>>(TYPES.CustomModelSelectedEventHandler)
    .to(CustomModelSelectedEventLoadModelVariantsHandler)
    .inTransientScope();

container
    .bind<ISyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandlerSync)
    .to(ProjectSelectedEventClearLocalRepositoryHandler)
    .inTransientScope();

// Auto-select first model variant after load
container
    .bind<ISyncEventHandler<ModelVariantsLoadedEvent>>(Symbol.for('ISyncEventHandler<ModelVariantsLoadedEvent>'))
    .to(ModelVariantsLoadedEventSelectFirstHandler)
    .inTransientScope();
