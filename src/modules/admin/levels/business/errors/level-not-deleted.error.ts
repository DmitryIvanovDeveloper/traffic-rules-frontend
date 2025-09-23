import ProjectsError from './levels.error';

export default class LevelNotDeletedError extends ProjectsError {
    constructor(id: string) {
        super(`Level with id ${id} not deleted`);
    }
}