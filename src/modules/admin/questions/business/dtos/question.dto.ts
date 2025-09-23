import GetQuestionsResponse, { GetAnswerResponse } from "../../infrastructure/repositories/dtos/get-questions.response";
import { LoadQuestionsInput } from "../usecases/types/load-questions.type";

export class LoadQuestionsRequest {
   readonly levelId: string;

   constructor(input: LoadQuestionsInput) {
      this.levelId = input.levelId;
   }
} 

export class QuestionDTO {
   public readonly id: string;
   public readonly text: string;
   public readonly points: number;
   public readonly levelId: string;
   public readonly lang: string;
   public readonly answers: AnswerDTO[];
   public readonly published: boolean;

   constructor(response: GetQuestionsResponse) {
      this.id = response.id;
      this.text = response.text;
      this.points = response.points;
      this.levelId = response.level_id;
      this.lang = response.lang_iso;
      this.answers = response.answers.map(answer => new AnswerDTO(answer));
      this.published = response.is_published
   }

} 

export class AnswerDTO {
   public readonly id: string;
   public readonly text: string;
   public readonly correct: boolean;
   public readonly lang: string;
   public readonly questionId: string;

   constructor(response: GetAnswerResponse) {
      this.id = response.id;
      this.text = response.text;
      this.correct = response.is_correct;
      this.lang = response.lang_iso;
      this.questionId = response.question_id;
   }
}
