import QuestionError from './questions.error';

export default class QuestionNotCreatedError extends QuestionError {
    constructor(){
        super(``);
    }
}