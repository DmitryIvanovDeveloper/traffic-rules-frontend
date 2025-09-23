import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelNameEmptyError extends ProjectsError {
    constructor(){
        super(``);
    }
}