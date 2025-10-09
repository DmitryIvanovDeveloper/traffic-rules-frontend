import { CreateQuestionResponse } from "../../../business/dtos/create-question.dto";
import { LoadAnswerResponse, LoadQuestionResponse, LoadQuestionsRequest } from "../../../business/dtos/load-question.dto";
import GetQuestionsResponse, { GetAnswerResponse } from "./get-questions.response";
import PostQuestionResponse from "./post-questions.request";


export function mapQuestionsResponseToDto(rawData: GetQuestionsResponse): LoadQuestionResponse {
    const { id, text, points, level_id, answers, lang_iso, image } = rawData;

    console.log('🖼️ mapQuestionsResponseToDto: raw data image', image, 'for question', id);

    const mappedAnswers = answers.map(answer => new LoadAnswerResponse(
        answer.id,
        answer.text,
        answer.is_correct,
        answer.lang_iso,
        answer.question_id,
    ))

    const mappedQuestion = new LoadQuestionResponse(
        id,
        text,
        points,
        level_id,
        lang_iso,
        image || null,
        mappedAnswers
    );

    console.log('🖼️ mapQuestionsResponseToDto: mapped question image', mappedQuestion.image);

    return mappedQuestion;
}

export function mapPostQuestionsResponseToDto(rawData: PostQuestionResponse): CreateQuestionResponse {
    const { id, text, points, level_id, answers, lang_iso, image } = rawData;

    const mappedAnswers = answers.map(answer => new LoadAnswerResponse(
        answer.id,
        answer.text,
        answer.is_correct,
        answer.lang_iso,
        answer.question_id,
    ))

    const mappedQuestion = new CreateQuestionResponse(
        id,
        text,
        points,
        level_id,
        lang_iso,
        image || null,
        mappedAnswers
    );

    return mappedQuestion;
}