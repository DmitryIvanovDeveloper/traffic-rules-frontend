import { LoadQuestionsInput } from "../usecases/types/load-questions.type";

export class LoadQuestionsRequest {
   readonly levelId: string;

   constructor(input: LoadQuestionsInput) {
      this.levelId = input.levelId;
   }
} 

export class LoadQuestionResponse {
   id: string;
   text: string;
   points: number;
   levelId: string;
   lang: string;
   image: string | null;
   answers: LoadAnswerResponse[];

   constructor(
      id: string,
      text: string,
      points: number,
      levelId: string,
      lang: string,
      image: string | null,
      answers: LoadAnswerResponse[]
   ) {
      this.id = id;
      this.text = text;
      this.points = points;
      this.levelId = levelId;
      this.lang = lang;
      this.image = image;
      this.answers = answers;
   }

} 

export class LoadAnswerResponse {
   id: string;
   text: string;
   correct: boolean;
   lang: string;
   questionId: string;

   constructor(id: string, text: string, correct: boolean, lang: string, question_id: string) {
      this.id = id;
      this.text = text;
      this.correct = correct;
      this.lang = lang;
      this.questionId = question_id;
   }
}
