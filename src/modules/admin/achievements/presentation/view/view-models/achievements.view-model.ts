import { IOption } from "@/ui/UniversalSelect.vue";
import Achievement from "../../../business/entities/achievements";

export default class AchievementViewModel {
    readonly id: string; 
    readonly name: string;
    readonly correctAnswersInRow: number;
    readonly timeCompleted: number;
    readonly stars: number;
    readonly earnedMoney: number;
    readonly description: string;
    readonly lang: string;
    readonly availableLevels: Array<IOption>;
    readonly availableQuestions: Array<IOption>;
    readonly edited: boolean;
    readonly deleting: boolean;

    constructor(entity: Achievement) {
        this.id = entity.id;
        this.name = entity.name;
        this.correctAnswersInRow = entity.correctAnswersInRow;
        this.timeCompleted = entity.timeCompleted;
        this.stars = entity.stars;
        this.earnedMoney = entity.earnedMoney;
        this.description = entity.description;
        this.lang = entity.lang;
        this.edited = entity.edited ?? false;
        this.deleting = entity.deleting ?? false;

    }
}
