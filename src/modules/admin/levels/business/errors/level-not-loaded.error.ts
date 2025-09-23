import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelsNotLoadedError extends ProjectsError {
    constructor(){
        super(``);
    }
}