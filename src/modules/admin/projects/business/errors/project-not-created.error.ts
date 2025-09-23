import ProjectsError from './projects.error';

export default class ProjectNotCreatedError extends ProjectsError {
    constructor(){
        super(``);
    }
}