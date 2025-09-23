import QuestionError from './questions.error';

export default class QuestionsNotLoadedError extends QuestionError {
    constructor(){
        super(``);
    }
}