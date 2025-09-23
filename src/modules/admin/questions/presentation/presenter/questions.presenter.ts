import QuestionViewModel from "../view-models/question.view-model";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { computed } from "vue";
import IQuestionsLocalRepository from "../../business/plugins/questions.local.repository.plugin";

export default class QuestionsPresenter {

    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _repository: IQuestionsLocalRepository
    ){}

    public readonly labels = {
        title: 'Вопросы',
        question: 'Вопрос',
        answers: 'Ответы',
        addAnswer: 'Добавить',
        points: 'Очки за правильный ответ'
    }

    public questionsViewModel = computed(() => {
        const questions = this._repository.getQuestions().value;
        const errors = this._repository.getQuestionsErrors().value;

        if (!questions) {
            return undefined;
        }

        const viewModels = questions.map(question => {
            const viewModel = new QuestionViewModel(question);

            const expectedErrors = errors.find(error => error.id === question.id);
            if (!expectedErrors) {
                return viewModel;
            }
            viewModel.setError(expectedErrors);
            return viewModel;
        });

        return viewModels.sort((a, b) => a.order - b.order);
    })
    public questionViewModel = computed(() => this.presentQuestion())
    
    private presentQuestion(): QuestionViewModel | null{
        const question = this._repository.getQuestion().value;
        if (!question) {
            return null;
        }

        const viewModel = new QuestionViewModel(question);
        const errors = this._repository.getQuestionsErrors().value;
        const expectedError = errors.find(error => error.id === question.id);
        if (!expectedError) {
            return viewModel
        }
        
        viewModel.setError(expectedError);
        return viewModel;
    }
} 