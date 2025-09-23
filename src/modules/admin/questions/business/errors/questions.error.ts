import { AppError } from '@/infrastructure/errors/app.error';

export default class QuestionError extends AppError {
    public readonly id: string;

    constructor(id: string, message: string) {
        super(message, 'QUESTIONS_ERROR');
        this.id = id;
    }
}
