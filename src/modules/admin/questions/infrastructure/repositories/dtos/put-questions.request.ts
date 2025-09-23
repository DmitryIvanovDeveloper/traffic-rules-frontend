import { UpdateQuestionRequestDTO, UpdateAnswerRequestDTO } from "../../../business/dtos/update-question.dto";
import { PostAnswerRequest } from "./post-questions.request";

export class PutQuestionRequest {
  readonly lang_iso: string;
  readonly text: string;
  readonly points: number;
  readonly order: number;
  readonly level_id: string;
  readonly is_published: boolean;
  readonly answers: Array<PostAnswerRequest>;

  constructor(createQuestionRequest: UpdateQuestionRequestDTO) {
    this.lang_iso = createQuestionRequest.lang;
    this.text = createQuestionRequest.text;
    this.points = createQuestionRequest.points;
    this.level_id = createQuestionRequest.levelId;
    this.order = createQuestionRequest.order;
    this.is_published = createQuestionRequest.published;

    this.answers = createQuestionRequest.answers.map(
      (answer) => new PutAnswerRequest(answer)
    );
  }
}

export class PutAnswerRequest {
    readonly lang_iso: string;
    readonly text: string;
    readonly id: string;
    readonly is_correct: boolean;
    readonly question_id: string;

  constructor(createAnswerRequest: UpdateAnswerRequestDTO) {
    this.lang_iso = createAnswerRequest.lang;
    this.text = createAnswerRequest.text;
    this.is_correct = createAnswerRequest.correct;
    this.question_id = createAnswerRequest.questionId;
    this.id = createAnswerRequest.id;
  }
}

export interface PutQuestionResponse {
    readonly id: string;
    readonly lang_iso:  string;
    readonly text: string;
    readonly points: number;
    readonly order: number;
    readonly level_id:  string;
    readonly answers: Array<PutAnswerResponse>
}

export interface PutAnswerResponse {
    readonly id: string;
    readonly lang_iso: string;
    readonly text: string;
    readonly is_correct: boolean,
    readonly question_id: string;
}''