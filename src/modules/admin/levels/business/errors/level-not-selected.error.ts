import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelNotSelectedError extends ProjectsError {
    constructor(id?: string){
        super(`Level with '${id}' nit selected`);
    }
}