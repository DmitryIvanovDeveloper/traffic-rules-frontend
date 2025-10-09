export class CreateQuestionRequest {
   id: string;
   text: string;
   points: number;
   levelId: string;
   lang: string;
   image: string | null;
   answers: Array<CreateAnswerRequest>;
} 

export class CreateAnswerRequest {
   lang:string;
   text: string;
   correct: boolean
} 



export class CreateQuestionResponse {
   id: string;
   text: string;
   points: number;
   levelId: string;
   lang: string;
   image: string | null;
   answers: CreateAnswerResponse[];

   constructor(
      id: string,
      text: string,
      points: number,
      levelId: string,
      lang: string,
      image: string | null,
      answers: CreateAnswerResponse[]
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

export class CreateAnswerResponse {
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


