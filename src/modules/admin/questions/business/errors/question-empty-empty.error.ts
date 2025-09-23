import QuestionError from './questions.error';

export default class QuestionEmptyError extends QuestionError {
    constructor(id: string) {
        super(id, ``);
    }
}
