import { AppError } from '@/infrastructure/errors/app.error';

export default class ProjectsError extends AppError {
    constructor(message: string) {
        super(message, 'PROJECTS_ERROR');
    }
}
