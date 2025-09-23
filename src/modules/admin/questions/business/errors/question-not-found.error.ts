import QuestionError from './questions.error';

export default class QuestionNotFoundError extends QuestionError {
    constructor(id: string){
        super(`Question with id '${id}' not found`);
    }
}