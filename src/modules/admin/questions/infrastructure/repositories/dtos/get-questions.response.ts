export interface GetAnswerResponse {
  id: string;
  text: string;
  is_correct: boolean;
  question_id: string;
  lang_iso: string;
}

export default interface GetQuestionsResponse {
    id: string;
    text: string;
    points: number;
    level_id: string;
    lang_iso: string;
    answers: GetAnswerResponse[];
}
  