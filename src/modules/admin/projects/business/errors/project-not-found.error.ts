import ProjectsError from './projects.error';

export default class ProjectNotFoundError extends ProjectsError {
    constructor(id: string){
        super(`Project with '${id}' not found`);
    }
}