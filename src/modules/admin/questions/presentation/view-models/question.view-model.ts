import ViewModelField from "@/modules/shared/view-models/view-model-field";
import { Answer } from "../../business/entities/Answer";
import Question from "../../business/entities/question";
import QuestionEmptyError from "../../business/errors/question-empty-empty.error";
import QuestionError from "../../business/errors/questions.error";
import QuestionAnswersEmptyError from "../../business/errors/question-answers-empty";
import AnswersEmptyError from "../../business/errors/answer-empty";


export default class QuestionViewModel {
	public readonly id: string;
	public readonly levelId: string;
	public readonly edited: boolean;
	public readonly deleting: boolean;
	public readonly answers: Array<AnswerViewModel>;
	public readonly name: ViewModelField = new ViewModelField();
	public readonly points: ViewModelField = new ViewModelField();
	public readonly image: ViewModelField = new ViewModelField();
	public readonly order: number
	public readonly published: boolean;
	public hasError: boolean

	constructor(question: Question) {
		this.id = question.id;
		this.name.value = question.text;
		this.points.value = question.points;
		this.image.value = question.image || "";
		this.levelId = question.levelId;
		this.answers = question.answers.map(answer => new AnswerViewModel(answer, question.showErrors)).sort((a, b) => a.order - b.order);
		this.edited = question.edited ?? false;
		this.deleting = question.deleting ?? false;
		this.order = question.order ?? 0;
		this.hasError = false;
		this.published = question.published ?? false;
		
		if (!question.showErrors) return;
		
		const errors = question.validate();
		this.setErrors(errors);
	}

	public setErrors(errors: ReadonlyArray<QuestionError>) {
		errors.forEach((error) => this.setError(error))
	}

	public setError(error: QuestionError) {

		if (error instanceof QuestionEmptyError) {
			this.name.error = 'Введите название вопроса'

			this.hasError = true;
		}

		if (error instanceof QuestionAnswersEmptyError) {
			this.hasError = true;
			this.answers.forEach(answer => {
				const answerError = error.answersErrors.find(answerError => answerError.id === answer.id);
				if (!answerError) {
					return;
				}

				answer.setErrors(answerError);
			})
		}
	}

	public updateImage(newImage: string | null): void {
		console.log('🔄 QuestionViewModel: updateImage called with', newImage);
		this.image.value = newImage || "";
		console.log('🔄 QuestionViewModel: image updated to', this.image.value);
	}
}

export class AnswerViewModel {
	readonly id: string;
	readonly name: ViewModelField = new ViewModelField();;
	readonly correct: boolean;
	readonly questionId: string;
	readonly lang: string;
	readonly order: number;

	constructor(answer: Answer, showErrors: boolean) {
		this.id = answer.id;
		this.name.value = answer.text;
		this.questionId = answer.questionId;
		this.correct = answer.correct;
		this.lang = answer.lang;
		this.order = answer.order ?? 0;

		if (!showErrors) return;

		const error = answer.validate();
		if (!error) return;

		this.setErrors(error);
	}

	public setErrors(error: AnswersEmptyError): void {
		this.name.error = 'Ответ не может быть пустым ';
	}
}

