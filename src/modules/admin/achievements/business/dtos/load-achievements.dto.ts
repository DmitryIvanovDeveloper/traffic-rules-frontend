import GetAchievementsResponse from "../../infrastructure/repositories/dtos/get-achievements.dto";

export class LoadAchievementsResponseDTO {
    readonly id: string; 
    readonly text: string;
    readonly correctAnswersInRow: number;
    readonly timeCompleted: number;
    readonly stars: number;
    readonly earnedMoney: number;
    readonly lang: string;
    readonly projectId: string; 
    readonly description: string; 
    readonly published: boolean;
    readonly levelsId: ReadonlyArray<string>;
    readonly questionsId: ReadonlyArray<string>;

    constructor(response: GetAchievementsResponse) {
        this.id = response.id;
        this.text = response.text;
        this.correctAnswersInRow = response.correct_answers_in_row;
        this.timeCompleted = response.time_completed;
        this.stars = response.stars;
        this.earnedMoney = response.earned_money;
        this.lang = response.lang_iso;
        this.projectId = response.project_id;
        this.description = response.description
        this.published = response.published;
        this.levelsId = response.levelsId
        this.questionsId = response.questionId;
    }
}
