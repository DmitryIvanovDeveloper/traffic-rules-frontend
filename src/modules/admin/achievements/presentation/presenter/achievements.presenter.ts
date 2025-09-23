import IAchievementsLocalRepository from "@/modules/admin/achievements/business/plugins/achievements.local-repository.plugin";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { computed } from "@vue/reactivity";
import AchievementViewModel from "../view/view-models/achievements.view-model";

@injectable()
export default class AchievementsPresenter {
    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _repository: IAchievementsLocalRepository
    ) {}

    public readonly labels = {
        title: 'Достижения'
    }

    public readonly achievementsViewModel = computed(() => this.presentViewModels());
    public readonly achievementViewModel = computed(() => this.presentViewModel());


    private presentViewModels(): Array<AchievementViewModel> {
        const achievements = this._repository.getAchievements().value;
        if (!achievements.length) {
            return [];
        }

        return achievements.map(achievement =>  new AchievementViewModel(achievement));
    }

    private presentViewModel(): AchievementViewModel | undefined {
        const achievement = this._repository.getAchievement().value;
        if (!achievement) {
            return;
        }

        return new AchievementViewModel(achievement)
    }
}
