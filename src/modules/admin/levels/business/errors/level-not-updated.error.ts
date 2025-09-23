import { id } from 'inversify';
import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelNotUpdatedError extends ProjectsError {
    constructor(id?: string) {
        super(` level with id ${id} not updated`);
    }
}