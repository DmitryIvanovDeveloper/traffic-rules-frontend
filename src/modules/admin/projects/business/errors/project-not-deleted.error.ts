import ProjectsError from './projects.error';

export default class ProjectNotDeletedError extends ProjectsError {
    constructor(id: string) {
        super(`Project with id ${id} not deleted`);
    }
}