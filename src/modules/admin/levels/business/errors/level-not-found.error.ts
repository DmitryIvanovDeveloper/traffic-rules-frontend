import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelNotFoundError extends ProjectsError {
    constructor(id: string){
        super(`Level with '${id}' not found`);
    }
}