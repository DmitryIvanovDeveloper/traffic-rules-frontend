import { inject, injectable } from "inversify";
import IAchievementsLocalRepository from "@/modules/admin/achievements/business/plugins/achievements.local-repository.plugin";
import { TYPES } from "../../types";
import { TYPES as ProjectTYPES } from "@/modules/admin/projects/types";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import SelectAchievementUseCase from "../../business/usecases/select-achievements.usecase";
import Result from "@/infrastructure/helpers/result";
import CreateAchievementUseCase from "../../business/usecases/create-achievement.usecase";
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin";
import AchievementNotCreatedError from "../../business/errors/achievement-not-created.error";
import NextAchievementUseCase from "../../business/usecases/next-achievement.usecase";
import PreviousAchievementUseCase from "../../business/usecases/previous-achievement.usecase";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import { ref } from "vue";
import DeleteAchievementUseCase from "../../business/usecases/delete-achievement.usecase";
import LoadQuestionsEvent from "@/modules/admin/questions/business/events/load-questions-event";

@injectable()
export default class AchievementsController {
  
	constructor(
		@inject(TYPES.AchievementsLocalRepository)
		private readonly _repository: IAchievementsLocalRepository,

		@inject(TYPES.SelectAchievementUseCase)
		private readonly _selectAchievementUseCase: SelectAchievementUseCase,

		@inject(TYPES.CreateAchievementUseCase)
		private readonly _createAchievementUseCase: CreateAchievementUseCase,

		@inject(TYPES.NextAchievementUseCase)
		private readonly _nextAchievementUseCase: NextAchievementUseCase,

		@inject(TYPES.PreviousAchievementUseCase)
		private readonly _previousAchievementUseCase: PreviousAchievementUseCase,

		@inject(TYPES.DeleteAchievementUseCase)
		private readonly _deleteAchievementUseCase: DeleteAchievementUseCase,


		@inject(ProjectTYPES.ProjectsService)
		private readonly _projectsService: IProjectsService,

		@inject(SharedTYPES.EventBus)
		private readonly _eventBus: IEventBus,
	) {}

	public readonly creating = ref<boolean>(false);
	
	public createAchievement = async (): Promise<Result<void>> => {
		const result = this._projectsService.getSelectedProjectId();
		if (!result.hasData()) {
			return Result.failure(new AchievementNotCreatedError())
		}

		try {
			this.creating.value = true
			return await this._createAchievementUseCase.execute({ projectId: result.data });
		} 
		finally {
			this.creating.value = false
		}
    }

	public deleteAchievement = async (id: string): Promise<void> => {
		const achievement = this._repository.findAchievementById(id);
		if (!achievement) return;

		const updatedAchievement = achievement.updatedWithDeleting(true);
		this._repository.updateAchievements(updatedAchievement);

		await this._deleteAchievementUseCase.execute({ achievementId: id})
    }

	public updateName(name: string) {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}
		const updatedAchievement = achievement.updatedWithName(name);
		this._repository.updateAchievements(updatedAchievement);
	}

	public async selectAchievement(id: string): Promise<Result<void>> {
		return  await this._selectAchievementUseCase.execute({ achievementId: id });
	}

	public updateNumCorrectAnswers(num: number): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithCorrectAnswersInRow(num);
		this._repository.updateAchievements(updatedAchievement);
    }

	public updatePublished(published: boolean): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithPublished(published);
		this._repository.updateAchievements(updatedAchievement);
    }

	public updateDescription(decription: string): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithDescription(decription);
		this._repository.updateAchievements(updatedAchievement);
    }

	public async updateLevelsId(levelsId: ReadonlyArray<string>): Promise<void> {

		levelsId.forEach(async (levelId) => {
			const achievement = this._repository.getAchievement().value;
			if (!achievement) {
				return;
			}
	
			const updatedAchievement = achievement.updatedWithLevelId(levelId);
			this._repository.updateAchievements(updatedAchievement);
	
			await this._eventBus.publishAsync(new LoadQuestionsEvent(levelId))
		});
	}

	public updateQuestionsId(questionsId: ReadonlyArray<string>): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		questionsId.forEach(async (questionId) => {
			const updatedAchievement = achievement.updatedWithQuestionsId(questionId);
			this._repository.updateAchievements(updatedAchievement);
		});
	}

	public nextAchievement = (): void => {
		this._nextAchievementUseCase.execute();
	}

	public previousAchievement = (): void => {
		this._previousAchievementUseCase.execute();
	}
}
