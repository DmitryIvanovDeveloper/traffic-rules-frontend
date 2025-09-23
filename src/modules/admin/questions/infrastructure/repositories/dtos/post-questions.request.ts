import { CreateAnswerRequest, CreateQuestionRequest } from "../../../business/dtos/create-question.dto";

export class PostQuestionRequest {
  readonly lang_iso: string;
  readonly text: string;
  readonly points: number;
  readonly level_id: string;
  readonly answers: Array<PostAnswerRequest>;

  constructor(createQuestionRequest: CreateQuestionRequest) {
    this.lang_iso = createQuestionRequest.lang;
    this.text = createQuestionRequest.text;
    this.points = createQuestionRequest.points;
    this.level_id = createQuestionRequest.levelId;
    this.answers = createQuestionRequest.answers.map(
      (answer) => new PostAnswerRequest(answer)
    );
  }
}

export class PostAnswerRequest {
  lang_iso: string;
  text: string;
  is_correct: boolean;

  constructor(createAnswerRequest: CreateAnswerRequest) {
    this.lang_iso = createAnswerRequest.lang;
    this.text = createAnswerRequest.text;
    this.is_correct = createAnswerRequest.correct;
  }
}

export interface PostAnswerResponse {
  id: string;
  text: string;
  is_correct: boolean;
  question_id: string;
  lang_iso: string;
}

export default interface PostQuestionResponse {
    id: string;
    text: string;
    points: number;
    level_id: string;
    lang_iso: string;
    answers: PostAnswerResponse[];
}
  

