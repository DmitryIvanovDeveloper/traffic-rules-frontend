import ProjectsError from './projects.error';

export default class ProjectsNameEmptyError extends ProjectsError {
    constructor(){
        super(``);
    }
}