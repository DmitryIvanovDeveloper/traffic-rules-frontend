import AnswersEmptyError from './answer-empty';
import QuestionError from './questions.error';

export default class QuestionAnswersEmptyError extends QuestionError {
    public readonly questionId: string;
    public readonly answersErrors: ReadonlyArray<AnswersEmptyError>;

    constructor(id: string, answersErrors: ReadonlyArray<AnswersEmptyError>) {
        super(id, ``);
        this.answersErrors = answersErrors;
    }
}
