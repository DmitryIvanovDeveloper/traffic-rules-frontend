import ProjectsError from './projects.error';

export default class ProjectsNotLoadedError extends ProjectsError {
    constructor(){
        super(``);
    }
}