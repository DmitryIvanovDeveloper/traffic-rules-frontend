import { UpdateAnswerRequestDTO } from "../../business/dtos/update-question.dto";
import { UpdateAnswerInputDTO, UpdateQuestionInputDTO } from "../../business/dtos/update-question.input";
import QuestionViewModel, { AnswerViewModel } from "../view-models/question.view-model";

export class QuestionMapper {
  static toUpdateInput(viewModel: QuestionViewModel): UpdateQuestionInputDTO {
    const answers: UpdateAnswerInputDTO[] = viewModel.answers.map((a: AnswerViewModel) => ({
      id: a.id,
      questionId: viewModel.id,
      text: a.name,
      correct: a.correct,
      lang: "RU",
    }));

    const updateQuestionInput: UpdateQuestionInputDTO = {
      id: viewModel.id,
      text: viewModel.name,
      points: viewModel.points,
      levelId: viewModel.levelId,
      lang: "RU", 
      answers,
    };

    return updateQuestionInput;
  }
}
