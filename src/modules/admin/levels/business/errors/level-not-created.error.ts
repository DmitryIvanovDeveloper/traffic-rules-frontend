import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelNotCreatedError extends ProjectsError {
    constructor(){
        super(``);
    }
}