import QuestionError from './questions.error';

export default class AnswersEmptyError extends QuestionError {
    constructor(id: string) {
        super(id, ``);
    }
}
