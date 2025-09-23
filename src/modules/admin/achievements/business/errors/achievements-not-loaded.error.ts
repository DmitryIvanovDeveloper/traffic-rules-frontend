import AchievementsError from './achievement.error';

export default class AchievementsNotLoadedError extends AchievementsError {
    constructor(){
        super(``);
    }
}