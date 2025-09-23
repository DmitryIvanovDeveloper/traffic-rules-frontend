import { container } from '@/infrastructure/bootstrap/inversify.config';

import IAchievementsHttpRepository from '@/modules/admin/achievements/business/plugins/achievements.http.repository.plugin';
import IAchievementsLocalRepository from '@/modules/admin/achievements/business/plugins/achievements.local-repository.plugin';
import AchievementsPresenter from '@/modules/admin/achievements/presentation/presenter/achievements.presenter';
import AchievementsController from '@/modules/admin/achievements/presentation/controller/achievements.controller';
import AchievementsHttpRepository from '../repositories/achievements.http.repository';
import AchievementsLocalRepository from '../repositories/achievements.local.repository';
import LoadAchievementsUseCase from '../../business/usecases/load-achievements.usecase';
import { IAsyncEventHandler, ISyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import ProjectSelectedEvent from '@/modules/admin/projects/business/events/project-selected-event';
import ProjectSelectedEventLoadAchievementsHandler from '../../business/events/handlers/project-selected-event-load-achievements.handler';
import { TYPES } from '../../types';
import SelectAchievementUseCase from '../../business/usecases/select-achievements.usecase';
import CreateAchievementUseCase from '../../business/usecases/create-achievement.usecase';
import PreviousAchievementUseCase from '../../business/usecases/previous-achievement.usecase';
import NextAchievementUseCase from '../../business/usecases/next-achievement.usecase';
import LevelsLoadedEventUpdateAvailableLevelsHandler from '../../business/events/handlers/levels-loaded-event-update-availableLevels.handler';
import LevelsLoadedEvent from '@/modules/admin/levels/business/events/levels-loaded-event';
import QuestionsLoadedEvent from '@/modules/admin/questions/business/events/questions-loaded-event';
import QuestionsLoadedEventUpdateAvailableQuestionsHandler from '../../business/events/handlers/questions-loaded-event-update-available-question.handler';
import DeleteAchievementUseCase from '../../business/usecases/delete-achievement.usecase';
import DeleteAchievementLocalUseCase from '../../business/usecases/delete-achievement-local.usecase';
import AchievemenetDeletedEventSelectDefaultAchievement from '../../business/events/handlers/achievement-deleted-event-select-default-achievement.handler';
import AchievementDeletedEvent from '../../business/events/achievement-deleted-event';
import ClearAchievementsLocalUseCase from '../../business/usecases/clear-achievements-local.usecase';

container
	.bind<IAchievementsHttpRepository>(TYPES.AchievementsHttpRepository)
	.to(AchievementsHttpRepository)

container
	.bind<IAchievementsLocalRepository>(TYPES.AchievementsLocalRepository)
	.to(AchievementsLocalRepository)
	.inSingletonScope();

container
	.bind(TYPES.AchievementsPresenter)
	.to(AchievementsPresenter)
	.inSingletonScope();

container
	.bind(TYPES.AchievementsController)
	.to(AchievementsController)
	.inSingletonScope();

container
	.bind(TYPES.LoadAchievementsUseCase)
	.to(LoadAchievementsUseCase)
	.inTransientScope();

container
	.bind(TYPES.SelectAchievementUseCase)
	.to(SelectAchievementUseCase)
	.inTransientScope()
;

container
	.bind(TYPES.DeleteAchievementsLocalUseCase)
	.to(ClearAchievementsLocalUseCase)
	.inTransientScope()
;


container
	.bind(TYPES.CreateAchievementUseCase)
	.to(CreateAchievementUseCase)
	.inTransientScope()
;

container
	.bind(TYPES.DeleteAchievementUseCase)
	.to(DeleteAchievementUseCase)
	.inTransientScope()
;

container
	.bind(TYPES.DeleteAchievementLocalUseCase)
	.to(DeleteAchievementLocalUseCase)
	.inTransientScope()
;

container
	.bind(TYPES.PreviousAchievementUseCase)
	.to(PreviousAchievementUseCase)
	.inTransientScope()
;

container
	.bind(TYPES.NextAchievementUseCase)
	.to(NextAchievementUseCase)
	.inTransientScope()
;

container
	.bind<IAsyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandler)
	.to(ProjectSelectedEventLoadAchievementsHandler)
	.inTransientScope()
	;

container
	.bind<ISyncEventHandler<QuestionsLoadedEvent>>(TYPES.QuestionsLoadedEventHandler)
	.to(QuestionsLoadedEventUpdateAvailableQuestionsHandler)
	.inTransientScope()
;

container
	.bind<ISyncEventHandler<LevelsLoadedEvent>>(TYPES.LevelsLoadedEventHandler)
	.to(LevelsLoadedEventUpdateAvailableLevelsHandler)

container
	.bind<ISyncEventHandler<AchievementDeletedEvent>>(TYPES.AchievementDeletedEventHandler)
	.to(AchievemenetDeletedEventSelectDefaultAchievement)


	