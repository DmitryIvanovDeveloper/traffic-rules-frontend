import { Ref } from "vue";
import Achievement from "../entities/achievements";

export default interface IAchievementsLocalRepository {
  clear(): unknown;
  getAchievements(): Ref<Array<Achievement>> 
  storeAchievements(achievements: Array<Achievement>): void;
  storeAchievements(achievements: Array<Achievement>): void;
  addAchievement(achievement: Achievement): void;
  updateAchievements(updatedAchievement: Achievement): void;
  storeAchievement(achievement: Achievement): void;
  getAchievement(): Ref<Achievement | undefined>;
  findAchievementById(id: string): Achievement | undefined;
}
