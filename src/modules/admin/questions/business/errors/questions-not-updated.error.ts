import { id } from 'inversify';
import QuestionError from './questions.error';

export default class QuestionNotUpdatedError extends QuestionError {
    constructor(id?: string) {
        super(`Question with id '${id}' not updated `);
    }
}