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
        points: 'Очки за правильный ответ',
        image: 'Изображение'
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
    private _currentViewModel: QuestionViewModel | null = null;
    
    public questionViewModel = computed(() => this.presentQuestion())
    
    private presentQuestion(): QuestionViewModel | null{
        const question = this._repository.getQuestion().value;
        console.log('🎭 QuestionsPresenter: presentQuestion called, question:', question);
        if (!question) {
            console.log('❌ QuestionsPresenter: no question found');
            this._currentViewModel = null;
            return null;
        }

        // Update existing ViewModel instead of creating new one
        if (this._currentViewModel && this._currentViewModel.id === question.id) {
            console.log('🎭 QuestionsPresenter: updating existing ViewModel with image:', question.image);
            this._currentViewModel.updateImage(question.image);
            return this._currentViewModel;
        }

        console.log('🎭 QuestionsPresenter: creating new ViewModel with image:', question.image);
        const viewModel = new QuestionViewModel(question);
        const errors = this._repository.getQuestionsErrors().value;
        const expectedError = errors.find(error => error.id === question.id);
        if (!expectedError) {
            console.log('✅ QuestionsPresenter: returning new ViewModel');
            this._currentViewModel = viewModel;
            return viewModel
        }
        
        viewModel.setError(expectedError);
        console.log('✅ QuestionsPresenter: returning new ViewModel with errors');
        this._currentViewModel = viewModel;
        return viewModel;
    }
} 