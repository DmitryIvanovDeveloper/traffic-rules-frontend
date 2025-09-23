import QuestionError from './questions.error';

export default class QuestionNotSelectedError extends QuestionError {
    constructor(id: string){
        super(`Question with id '${id}' not selected`);
    }
}