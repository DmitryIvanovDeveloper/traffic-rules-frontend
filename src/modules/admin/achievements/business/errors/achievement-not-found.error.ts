import AchievementsError from './achievement.error';

export default class AchievementsNotFoundError extends AchievementsError {
    constructor(id: string){
        super(`Achievement with '${id}' id not found`);
    }
}