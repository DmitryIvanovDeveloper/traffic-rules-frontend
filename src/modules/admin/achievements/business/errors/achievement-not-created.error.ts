import AchievementsError from './achievement.error';

export default class AchievementNotCreatedError extends AchievementsError {
    constructor(){
        super(``);
    }
}