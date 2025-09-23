import QuestionError from './questions.error';

export default class QuestionNotDeletedError extends QuestionError {
    constructor(id?: string){
        super(`Question not deleted with id '${id}'`);
    }
}