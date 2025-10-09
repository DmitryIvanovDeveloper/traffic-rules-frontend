import Result from "@/infrastructure/helpers/result";
import Question from "../../business/entities/question";
import QuestionNotFoundError from '../../business/errors/question-not-found.error';
import IQuestionsLocalRepository from '../../business/plugins/questions.local.repository.plugin';
import { Ref, ref } from "vue";
import QuestionError from "../../business/errors/questions.error";

export default class QuestionsLocalRepository implements IQuestionsLocalRepository  {
    private _questions = ref<ReadonlyArray<Question> | undefined>(undefined);
    private _questionsErrors = ref<ReadonlyArray<QuestionError>>([]);
    private _question = ref<Question>()

    public storeQuestions(questions: ReadonlyArray<Question>): void {
        this._questions.value = questions;
    }

    public updateQuestions(updatedQuestion: Question): void {
        console.log('💾 QuestionsLocalRepository: updateQuestions called with', updatedQuestion.id, 'image:', updatedQuestion.image);
        if (!this._questions.value) {
            console.log('❌ QuestionsLocalRepository: no questions array');
            return;
        }
        const index = this._questions.value.findIndex((question) => question.id === updatedQuestion.id);
        if (index === -1) {
            console.log('❌ QuestionsLocalRepository: question not found');
            return;
        }

        const copy = [...this._questions.value];
        copy[index] = updatedQuestion;
        this._questions.value = copy;
        this._question.value = updatedQuestion;
        console.log('✅ QuestionsLocalRepository: question updated, new image:', updatedQuestion.image);
    }

    public addQuestion(question: Question) {
        if (!this._questions.value) {
            return;
        }
        this._questions.value = [...this._questions.value, question];
    }

    public getQuestions(): Ref<ReadonlyArray<Question> | undefined> {
        return this._questions
    }
     
    public getQuestion(): Ref<Question | undefined> {
        return this._question;
    }

    public storeQuestion(question: Question): void {
        this._question.value = question;
    }

    public clearQuestion(): void {
        this._question.value = undefined;
    }

    public findQuestionById(id: string): Result<Question> {
        const expectedQuestion = this._questions.value?.find(question => question.id === id);
        if (!expectedQuestion) {
            return Result.failure(new QuestionNotFoundError(id))
        }

        return Result.success(expectedQuestion);
    }

    public clear = (): void => {
        this._questions.value = undefined;
        this.clearQuestion();
    }

    public storeQuestionsErrors(questionsErrors: ReadonlyArray<QuestionError>): void {
        this._questionsErrors.value = questionsErrors;
    }

    public getQuestionsErrors(): Ref<ReadonlyArray<QuestionError>> {
        return this._questionsErrors;
    }

    public clearQuestionsErrors<T extends QuestionError>(type?: new () => T): void {
        if (!type) {
            this._questionsErrors.value = [];
            return;
        }

        this._questionsErrors.value = this._questionsErrors.value.filter(error => error instanceof type)
    }
}