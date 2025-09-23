import { PutQuestionResponse, PutAnswerResponse } from "../../infrastructure/repositories/dtos/put-questions.request";

export class UpdateQuestionRequestDTO {
   readonly id: string;
   readonly text: string;
   readonly points: number;
   readonly published: boolean;
   readonly order: number;
   readonly levelId: string;
   readonly lang: string;
   readonly answers: Array<UpdateAnswerRequestDTO>;
} 

export class UpdateAnswerRequestDTO {
   readonly lang:string;
   readonly text: string;
   readonly correct: boolean
   readonly questionId: string
   readonly id: string
}

export class UpdateQuestionResponseDTO {
   readonly id: string;
   readonly text: string;
   readonly points: number;
   readonly order: number;
   readonly levelId: string;
   readonly lang: string;
   readonly answers: Array<UpdateAnswerResponseDTO>;

   constructor(response: PutQuestionResponse) {
      this.id = response.id;
      this.text = response.text;
      this.points = response.points;
      this.levelId = response.level_id;
      this.order = response.order;
      this.lang = response.lang_iso;
      this.answers = response.answers.map(answer => new UpdateAnswerResponseDTO(answer));
   }
} 

export class UpdateAnswerResponseDTO {
   readonly lang:string;
   readonly text: string;
   readonly correct: boolean
   readonly questionId: string
   readonly id: string

   constructor(response: PutAnswerResponse) {
      this.lang = response.lang_iso;
      this.text = response.text;
      this.correct = response.is_correct;
      this.questionId = response.question_id;
      this.id = response.id;
   }
}