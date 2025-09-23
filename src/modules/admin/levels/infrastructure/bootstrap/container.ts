import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { IAsyncEventHandler, ISyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import LevelsPresenter from '../../presentation/presenter/levels.presenter';
import LevelsController from '../../presentation/controller/levels.controller';
import LoadLevelsUseCase from '../../business/usecases/load-levels.usecase';
import LevelsHttpRepository from '../repositories/levels.http.repository';
import ProjectSelectedEvent from '@/modules/admin/projects/business/events/project-selected-event';
import SelectLevelUseCase from '../../business/usecases/select-level.usecase';
import CreateLevelUseCase from '../../business/usecases/create-level.usecase';
import LevelService from '../../business/services/level.service';
import ILevelsLocalRepository from '../../business/plugins/levels.local.repository.plugin';
import LevelsLocalRepository from '../repositories/levels.local.repository';
import ILevelsHttpRepository from '../../business/plugins/levels.http.repository.plugin';
import SaveProjectEvent from '@/modules/admin/projects/business/events/save-project-event';
import SaveProjectEventUpdateLevelHandler from '../../business/events/handlers/save-project-event-update-level.handler';
import UpdateLevelUseCase from '../../business/usecases/update-level.usecase';
import ProjectCreatedEventCreateDefaultLevelHandler from '../../business/events/handlers/project-created-event-create-default-level.handler';
import ProjectCreatedEvent from '@/modules/admin/projects/business/events/project-created-event';
import LevelCreatedEvent from '../../business/events/level-created-event';
import LevelCreatedEventSelectLevelHandler from '../../business/events/handlers/level-created-event-select-level.handler';
import DeleteLevelUseCase from '../../business/usecases/delete-level.usecase';
import LevelsLoadedEventSelectLevelHandler from '../../business/events/handlers/levels-loaded-event-select-level.handler';
import LevelsLoadedEvent from '../../business/events/levels-loaded-event';
import DeleteLevelsLocalUseCase from '../../business/usecases/delete-levels-local.usecase';
import LevelDeletedEventSelectDefaultLevelHandler from '../../business/events/handlers/level-deleted-event-select-default-level.handler';
import LevelDeletedEvent from '../../business/events/level-deleted-event';
import ClearLevelsLocalUseCase from '../../business/usecases/clear-levels-local.usecase';
import ProjectDeletedEvent from '@/modules/admin/projects/business/events/project-deleted-event';
import ProjectDeletedEventDeleteLevelsLocalHandler from '../../business/events/handlers/project-deleted-event-delete-levels-local.handler';
import DeleteLevelsLocalByProjectIdUseCase from '../../business/usecases/delete-levels-local-by-project-id.usecase';
import ProjectSelectedEventClearLocalRepositoryHandler from '../../business/events/handlers/project-selected-event-clear-local-repostory.handler';
import ProjectSelectedEventLoadLevelsHandler from '../../business/events/handlers/project-selected-event-load-levels.handler';

container
    .bind<LevelsPresenter>(TYPES.LevelsPresenter)
    .to(LevelsPresenter)
    .inSingletonScope()
;

container
    .bind<LevelsController>(TYPES.LevelsController)
    .to(LevelsController)
    .inSingletonScope()
;

container
    .bind<LevelService>(TYPES.LevelsService)
    .to(LevelService)
    .inSingletonScope()
;

container
    .bind<LoadLevelsUseCase>(TYPES.LoadPresentLevelsUseCase)
    .to(LoadLevelsUseCase)
    .inTransientScope()
;

container
    .bind<SelectLevelUseCase>(TYPES.SelectLevelUseCase)
    .to(SelectLevelUseCase)
    .inTransientScope()
;

container
    .bind<CreateLevelUseCase>(TYPES.CreateLevelUseCase)
    .to(CreateLevelUseCase)
    .inTransientScope()
;

container
    .bind<UpdateLevelUseCase>(TYPES.UpdateLevelUseCase)
    .to(UpdateLevelUseCase)
    .inTransientScope()
;

container
    .bind<DeleteLevelUseCase>(TYPES.DeleteLevelUseCase)
    .to(DeleteLevelUseCase)
    .inTransientScope()
;

container
    .bind<DeleteLevelsLocalUseCase>(TYPES.DeleteLevelLocalUseCase)
    .to(DeleteLevelsLocalUseCase)
    .inTransientScope()
;

container
    .bind(TYPES.DeleteLevelsLocalByProjectIdUseCase)
    .to(DeleteLevelsLocalByProjectIdUseCase)
    .inTransientScope()
;

container
    .bind(TYPES.ClearLevelsLocalUseCase)
    .to(ClearLevelsLocalUseCase)
    .inTransientScope()
;

container
    .bind<ILevelsLocalRepository>(TYPES.LevelsLocalRepository)
    .to(LevelsLocalRepository)
    .inSingletonScope()
;

container
    .bind<ILevelsHttpRepository>(TYPES.LevelsHttpRepository)
    .to(LevelsHttpRepository)
    .inSingletonScope()
;

container
    .bind<IAsyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandler)
    .to(ProjectSelectedEventLoadLevelsHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<ProjectDeletedEvent>>(TYPES.ProjectDeletedEventHandler)
    .to(ProjectDeletedEventDeleteLevelsLocalHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<SaveProjectEvent>>(TYPES.SaveProjectEventHandler)
    .to(SaveProjectEventUpdateLevelHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<ProjectCreatedEvent>>(TYPES.ProjectCreatedEventHandler)
    .to(ProjectCreatedEventCreateDefaultLevelHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<LevelCreatedEvent>>(TYPES.LevelCreatedEventHandler)
    .to(LevelCreatedEventSelectLevelHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<LevelDeletedEvent>>(TYPES.LevelDeletedEventHandler)
    .to(LevelDeletedEventSelectDefaultLevelHandler)
    .inTransientScope()
;

container
    .bind<ISyncEventHandler<LevelsLoadedEvent>>(TYPES.LevelsLoadedEventHandler)
    .to(LevelsLoadedEventSelectLevelHandler)
    .inTransientScope()
;

container
    .bind<ISyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandlerSync)
    .to(ProjectSelectedEventClearLocalRepositoryHandler)
    .inTransientScope()
;

