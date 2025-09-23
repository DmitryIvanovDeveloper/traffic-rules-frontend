import ProjectsError from './projects.error';

export default class ProjectsNotUpdatedError extends ProjectsError {
    constructor(id?: string ){
        super(`Project with '${id}' id not updated`);
    }
}