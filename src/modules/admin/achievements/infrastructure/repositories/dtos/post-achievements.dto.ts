import { CreateAchievementRequestDTO } from "../../../business/dtos/create-achievements.dto";

export  class PostAchievementRequest {
    readonly text: string;
    readonly lang_iso: string;
    readonly project_id: string;
    readonly correct_answers_in_raw: number;
    readonly time_completed: number;
    readonly stars: number;
    readonly earned_money: number;
    readonly description: string;
    readonly published: boolean;
    readonly questionsId: ReadonlyArray<string>;
    readonly levelsId: ReadonlyArray<string>;

    constructor(dto: CreateAchievementRequestDTO) {
        this.text = dto.text;
        this.lang_iso = dto.lang;
        this.project_id = dto.projectId;
        this.correct_answers_in_raw = dto.correctAnswersInRaw;
        this.time_completed = dto.timeCompleted;
        this.stars = dto.stars;
        this.earned_money = dto.earnedMoney;
        this.description = dto.description;
        this.published = dto.published;
        this.questionsId = dto.questionsId;
        this.levelsId = dto.levelsId;
    }
}

export interface PostAchievemensResponse {
    readonly id: string;
    readonly text:  string;
    readonly correct_answers_in_row: number;
    readonly time_completed: number;
    readonly stars: number;
    readonly earned_money: number;
    readonly icon: string | null;
    readonly lang_iso: string;
    readonly project_id: string;
    readonly description: string;
    readonly published: boolean;
    readonly levelsId: ReadonlyArray<string>;
    readonly questionsId: ReadonlyArray<string>;
}