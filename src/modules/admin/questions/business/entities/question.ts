import { v4 as uuidv4 } from "uuid";
import {
	CreateQuestionRequest,
	CreateQuestionResponse,
} from "../dtos/create-question.dto";
import { LoadQuestionResponse } from "../dtos/load-question.dto";
import { UpdateQuestionRequestDTO, UpdateQuestionResponseDTO } from "../dtos/update-question.dto";
import { Answer } from "./answer";
import Result from "@/infrastructure/helpers/result";
import QuestionError from "../errors/questions.error";
import QuestionAnswersEmptyError from "../errors/question-answers-empty";
import QuestionEmptyError from "../errors/question-empty-empty.error";
import AnswersEmptyError from "../errors/answer-empty";

export interface QuestionProps {
	readonly id?: string;
	readonly text?: string;
	readonly points?: number;
	readonly levelId?: string;
	readonly lang?: string;
	readonly image?: string | null;
	readonly answers?: ReadonlyArray<Answer>;
	readonly edited?: boolean;
	readonly deleting?: boolean;
	readonly published?: boolean;
	readonly order?: number;
	readonly showErrors?: boolean;
}

export default class Question {
	public readonly id: string;
	public readonly text: string;
	public readonly points: number;
	public readonly levelId: string;
	public readonly image: string | null;
	public readonly answers: ReadonlyArray<Answer>;
	public readonly lang: string;
	public readonly edited: boolean;
	public readonly deleting: boolean;
	public readonly published: boolean;
	public readonly order: number;
	public readonly showErrors: boolean;

	constructor(props: QuestionProps) {
		this.id = props.id ?? uuidv4();
		this.text = props.text ?? "";
		this.points = props.points ?? 0;
		this.levelId = props.levelId ?? "";
		this.image = props.image ?? null;
		this.lang = props.lang ?? "en";
		this.answers = props.answers?.map((a) => new Answer(a)) ?? [];
		this.edited = props.edited ?? false;
		this.deleting = props.deleting ?? false;
		this.order = props.order ?? 0;
		this.published = props.published ?? false;
		this.showErrors = props.showErrors ?? false
	}

	public withUpdatedText(text: string): this {
		return this.cloneWith({ text, edited: true });
	}

	public withUpdatedPoints(points: number): this {
		if (points < 0) {
			return this;
		}

		console.log(points)
		return this.cloneWith({ points, edited: true });
	}

	public withUpdatedAnswerText(answerId: string, newText: string): this {
        const answer = this.answers.find(a => a.id === answerId);
        if (!answer) {
			return this;
        }

		const updatedAnswer = answer.withUpdatedText(newText);
		return this.withUpdatedAnswer(updatedAnswer);
    }

	public withUpdatedCorrectAnswer(answerId: string, correct: boolean): this {
		const updatedAnswers = this.answers.map((answer) => {
			if (answer.id === answerId) {
				return answer.withUpdatedCorrect(correct);        
			}
			
			return answer.withUpdatedCorrect(false);
		});

		return this.cloneWith({ answers: updatedAnswers, edited: true });
	}

	public withUpdatedAnswerOrderUpResult(id: string): this {
		return this.withSwappedAnswers(id, -1);
	}

	public withUpdatedAnswerOrderDownResult(id: string): this {
		return this.withSwappedAnswers(id, 1);
	}

	public withUpdatedPublished(published: boolean): this {
		return this.cloneWith({ published, edited: true });
	}

	public withUpdatedShowErrors(): this {
		return this.cloneWith({ showErrors: true });
	}

	public withNewAnswer(): this {
		if (this.answers.length === 4) {
			return this;
		}

		const correct = this.answers.some((a) => a.correct);

		const order = this._getOrder();
		const newAnswer = new Answer({ correct: !correct, questionId: this.id, order });
		return this.cloneWith({ answers: [...this.answers, newAnswer], edited: true });
	}

	public withRemovedAnswer(answerId: string): this {
		const updatedAnswers = this.answers.filter(answer => answer.id !== answerId).map((answer, index) =>
			answer.withUpdatedOrder(index + 1)
		);
		return this.cloneWith({ answers: updatedAnswers, edited: true });
	}

	public withUpdatedDeleting(deleting: boolean): this {
		return this.cloneWith({ deleting });
	}

	public withUpdatedAnswer(answer: Answer): this {
		const index = this.answers.findIndex((a) => a.id === answer.id);
		if (index === -1) {
			return this;
		}
		const copy = [...this.answers]
		copy[index] = answer;

		return this.cloneWith({ answers: copy, edited: true });
	}

	public withUpdatedAnswersOrder(fromItemId: string, toItemId: string): this {
		const fromResult = this.findIndexOrFail(fromItemId);
		if (!fromResult.hasData()) return this;

		const toResult = this.findIndexOrFail(toItemId);
		if (!toResult.hasData()) return this;



		const fromItem = this.answers[fromResult.data];
		const toItem = this.answers[toResult.data];

		const newItems = [...this.answers];
		newItems[fromResult.data] = fromItem.withUpdatedOrder(toItem.order);
		newItems[toResult.data] = toItem.withUpdatedOrder(fromItem.order);

		return this.cloneWith({ answers: newItems });
	}

	public withUpdatedOrder(order: number): this {
		return this.cloneWith({ order });
	}

	public findIndexOrFail(id: string): Result<number> {
		const index = this.answers.findIndex(answer => answer.id === id);
		return index === -1 ? Result.failure() : Result.success(index);
	}

	public cloneWith(props: Partial<QuestionProps>): this {
		return new Question({
			id: this.id,
			text: props.text ?? this.text,
			points: props.points ?? this.points,
			levelId: this.levelId,
			lang: this.lang,
			answers: props.answers ?? this.answers,
			edited: props.edited ?? this.edited,
			deleting: props.deleting ?? this.deleting,
			order: props.order ?? this.order,
			published: props.published ?? this.published,
			showErrors: props.showErrors ?? this.showErrors,
		}) as this;
	}

	public static create(props: QuestionProps): Question {
		return new Question({
			id: props.id ?? uuidv4(),
			text: props.text ?? "Новый вопрос",
			points: props.points ?? 0,
			levelId: props.levelId ?? "",
			lang: props.lang ?? "RU",
			answers: props.answers?.map((a) => new Answer(a)) ?? [],
			edited: false,
			deleting: false,
			order: props.order ?? 0,
			published: props.published ?? false,
			showErrors: props.showErrors ?? false,
		});
	}

	public static toEntity(dto: LoadQuestionResponse | CreateQuestionResponse | UpdateQuestionResponseDTO): Question {
		// Проверяем обязательные поля
		if (!dto.id || !dto.text || dto.levelId === undefined) {
			throw new Error(`Invalid Question data: missing required fields. Data: ${JSON.stringify(dto)}`);
		}

		const answers = (dto.answers || []).map(
			(a) => new Answer({id: a.id, text: a.text, correct: a.correct, lang:a.lang, questionId: a.questionId})
		);
		return new Question({
			id: dto.id,
			text: dto.text,
			points: dto.points || 0,
			levelId: dto.levelId,
			lang: dto.lang || "RU",
			answers: answers,
			edited: false,
			deleting: false,
			image: dto.image || null,
		});
	}

	public toCreateRequest(): CreateQuestionRequest {
		return {
			id: this.id,
			text: this.text,
			points: this.points,
			levelId: this.levelId,
			lang: this.lang,
			answers: this.answers.map((a) => ({ ...a })),
		};
	}

	public toUpdateRequest(): UpdateQuestionRequestDTO {
		return {
			id: this.id,
			text: this.text,
			points: this.points,
			order: this.order,
			levelId: this.levelId,
			lang: this.lang,
			published: this.published,
			answers: this.answers.map((a) => ({ ...a })),
		};
	}

	public withSwappedAnswers(id: string, offset: number): this {
		const index = this.answers.findIndex(item => item.id === id);
		if (index === -1 || !this.answers[index + offset]) {
			return this;
		}

		const current = this.answers[index];
		const neighbor = this.answers[index + offset];

		const updatedAnswers = [...this.answers];
		updatedAnswers[index] = neighbor.withUpdatedOrder(current.order);
		updatedAnswers[index + offset] = current.withUpdatedOrder(neighbor.order);

		return this.cloneWith({answers: updatedAnswers });
	}

	public _getOrder(): number {
		return this.answers.length > 0
			? Math.max(...this.answers.map(answer => answer.order)) + 1
			: 1;
	}

	public validate(): ReadonlyArray<QuestionError> {

		const errors = new Array<QuestionError>

		const answersErrors = new Array<AnswersEmptyError>();

        this.answers.forEach(answer => {
			const answerError = answer.validate();
			if (!answerError) {
				return;
			}

			answersErrors.push(answerError);
		});

		if (answersErrors.length) {
			const error = new QuestionAnswersEmptyError(this.id, answersErrors);
			errors.push(error);
		}

		if (!this.text) {
			const error = new QuestionEmptyError(this.id);
			errors.push(error);
		}

		return errors;
    }

}
