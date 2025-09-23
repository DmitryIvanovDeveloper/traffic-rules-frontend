import { PostAchievemensResponse } from "../../infrastructure/repositories/dtos/post-achievements.dto"

export class CreateAchievementRequestDTO {
    readonly text: string;
    readonly lang: string;
    readonly projectId: string;
    readonly correctAnswersInRaw: number;
    readonly timeCompleted: number;
    readonly stars: number;
    readonly earnedMoney: number;
    readonly description: string;
    readonly published: boolean;
    readonly levelsId: ReadonlyArray<string>;
    readonly questionsId: ReadonlyArray<string>;
}

export class CreateAchievementResponseDTO {
    readonly id: string;
    readonly text:  string;
    readonly correctAnswersInRow: number;
    readonly timeCompleted: number;
    readonly stars: number;
    readonly earnedMoney: number;
    readonly icon: string | null;
    readonly lang: string;
    readonly projectId: string;
    readonly description: string;
    readonly published: boolean;
    readonly levelsId: ReadonlyArray<string>;
    readonly questionsId: ReadonlyArray<string>;

    constructor(response: PostAchievemensResponse) {
        this.id = response.id;
        this.text = response.text;
        this.correctAnswersInRow = response.correct_answers_in_row;
        this.timeCompleted = response.time_completed;
        this.stars = response.stars;
        this.earnedMoney = response.earned_money;
        this.icon = response.icon;
        this.lang = response.lang_iso;
        this.projectId = response.project_id;
        this.description = response.description;
        this.published = response.published;
        this.levelsId = response.levelsId;
        this.questionsId = response.questionsId;
    }
}

