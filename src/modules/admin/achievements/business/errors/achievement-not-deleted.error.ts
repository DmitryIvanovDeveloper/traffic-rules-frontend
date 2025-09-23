import AchievementsError from './achievement.error';

export default class AchievementNotDeletedError extends AchievementsError {
    constructor(id: string){
        super(`Achievement with id ${id} not deleted`);
    }
}