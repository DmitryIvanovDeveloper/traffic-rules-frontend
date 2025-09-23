import { ref, Ref } from "vue";
import IAchievementsLocalRepository from "../../business/plugins/achievements.local-repository.plugin";
import Achievement from "../../business/entities/achievements";

export default class AchievementsLocalRepository implements IAchievementsLocalRepository {
	private _achievements = ref<Array<Achievement>>([]);
	private _achievement = ref<Achievement>();

	public getAchievements(): Ref<Array<Achievement>> {
		return this._achievements;
	}

	public addAchievement(achievement: Achievement): void {
		this._achievements.value.push(achievement);
	}

	public updateAchievements(updatedAchievement: Achievement): void {
		const index = this._achievements.value.findIndex((question) => question.id === updatedAchievement.id);
		if (index === -1) {
			return;
		}

		this._achievements.value[index] = updatedAchievement;
		this._achievement.value = updatedAchievement;
	}

	public getAchievement(): Ref<Achievement | undefined> {
		return this._achievement;
	}
	public storeAchievements(achievements: Array<Achievement>): void {
		this._achievements.value = achievements;
	}
	
	public storeAchievement(achievement: Achievement): void {
		this._achievement.value = achievement;
	}

	public findAchievementById(id: string): Achievement | undefined {
		return this._achievements.value.find(achievement => achievement.id === id);
	}

	public clear(): void {
		this._achievements.value = [];
		this._achievement.value = undefined;
	}
}
