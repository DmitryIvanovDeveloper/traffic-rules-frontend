export default interface GetAchievementsResponse {
    readonly id: string; 
    readonly text: string;
    readonly correct_answers_in_row: number;
    readonly time_completed: number;
    readonly stars: number;
    readonly earned_money: number;
    readonly lang_iso: string;
    readonly project_id: string; 
    readonly description: string; 
    readonly published: boolean;
    readonly levelsId: ReadonlyArray<string>;
    readonly questionId: ReadonlyArray<string>;
}