import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './projects.error';

export default class ProjectNotSelectedError extends ProjectsError {
    constructor(id?: string){
        super(`Project with '${id}' not selected`);
    }
}