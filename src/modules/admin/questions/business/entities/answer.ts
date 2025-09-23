
import { v4 as uuidv4 } from "uuid";
import AnswersEmptyError from "../errors/answer-empty";

export interface AnswerProps {
	readonly id?: string;
	readonly text?: string;
	readonly correct?: boolean;
	readonly lang?: string;
	readonly questionId?: string;
	readonly order?: number;
}

export class Answer {
	
	readonly id: string;
	readonly text: string;
	readonly correct: boolean;
	readonly lang: string;
	readonly questionId: string;
	readonly order: number;

	constructor(props: AnswerProps) {
		this.id = props.id ?? uuidv4();
		this.text = props.text ?? '';
		this.correct = props.correct ?? false;
		this.lang = props.lang ?? 'RU';
		this.questionId = props.questionId ?? this.questionId;
		this.order = props.order ?? 0;
	}

	public withUpdatedText(newText: string): this {
		return this.cloneWith({ text: newText });
	}

	public withUpdatedCorrect(correct: boolean): this {
		return this.cloneWith({ correct });
	}

	public withUpdatedOrder(order: any): Answer {
		return this.cloneWith({ order });
	}

	public cloneWith(params: Partial<AnswerProps>): this {
		return new Answer({
			id: this.id,
			text: params.text ?? this.text,
			correct: params.correct ?? this.correct,
			lang: params.lang ?? this.lang,
			questionId: params.questionId ?? this.questionId,
			order: params.order ?? this.order
		}) as this;
	}

	static create(props: AnswerProps): Answer {
		return new Answer(props);
	}

	public validate(): AnswersEmptyError | undefined {
		if (this.text) {
			return;
		}

		return new AnswersEmptyError(this.id);
	}
}
