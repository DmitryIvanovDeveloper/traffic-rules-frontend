import Result from "@/infrastructure/helpers/result";
import Question from "../entities/question";
import { Ref } from "vue";
import QuestionError from "../errors/questions.error";

export default interface IQuestionsLocalRepository {
    clear(): void;
    clearQuestion(): void;
    storeQuestions(questions: ReadonlyArray<Question>): void;
    storeQuestion(question: Question): void;
    updateQuestions(updatedQuestion: Question): void;
    findQuestionById(id: string): Result<Question>
    getQuestions(): Ref<ReadonlyArray<Question> | undefined>;
    getQuestion(): Ref<Question | undefined>;

    storeQuestionsErrors(questionsErrors: ReadonlyArray<QuestionError>): void;
    getQuestionsErrors(): Ref<ReadonlyArray<QuestionError>>;
    clearQuestionsErrors<T extends QuestionError>(type?: new () => T): void;
}