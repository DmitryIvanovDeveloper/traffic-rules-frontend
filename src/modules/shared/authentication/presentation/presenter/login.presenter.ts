import { inject, injectable } from 'inversify';
import ILoginPresenter from '../../business/plugins/login.presenter.interface';
import { computed } from '@vue/reactivity';
import { TYPES } from '../../types';
import IAuthenticationLocalRepository from '../../business/plugins/authentication.local.repository.plugin';
import LoginViewModel from './view-models/login.view-model';


@injectable()
export default class LoginPresenter implements ILoginPresenter {

    constructor(
        @inject(TYPES.AuthenticationLocalRepository)
        private readonly _localRepository: IAuthenticationLocalRepository
    ) {}

    public readonly labels = {
        title: 'Авторизация',
        email: {
            label: "Email (личный)",
            required: true,
            placeholder: 'email@example.com'
        },
        phone: {
            label: "Телефон",
            required: true,
            placeholder: '+7 (___)___-__-_'
        },
        password: {
            label: "Пароль",
            required: true,
            placeholder: ''
        },
        confirm: 'Войти',
        notRegistered: {
            title: 'Еще не зарегистрированы?',
            goto: "Зарегистрироваться"
        },
        loginType: {
            phone: 'Телефон',
            email: 'Email'
        }
    }

    public loginVewModel = computed(() => {
        const login = this._localRepository.getLogin().value;
        if (!login) {
            return null;
        }

        return new LoginViewModel(login);
    })
}
