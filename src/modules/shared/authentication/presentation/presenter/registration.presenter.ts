import { inject, injectable } from 'inversify';
import IRegistrationPresenter from '../../business/plugins/registration.presenter.interface';
import { computed } from '@vue/reactivity';
import { TYPES } from '../../types';
import IAuthenticationLocalRepository from '../../business/plugins/authentication.local.repository.plugin';
import RegistrationViewModel from './view-models/registration.view-model';

@injectable()
export default class RegistrationPresenter implements IRegistrationPresenter {
  
    constructor(
        @inject(TYPES.AuthenticationLocalRepository)
        private readonly _authenticationLocalRepository: IAuthenticationLocalRepository
    ) {}


    public labels = {
        title: 'Регистрация',
        company: {
            label: "Введите название компании",
            required: true,
            placeholder: 'OOO "Пример компании"'
        },
        name: {
            label: "Имя",
            required: true,
            placeholder: 'Введите имя'
        },
        lastName: {
            label: "Фамилия",
            required: true,
            placeholder: 'Введите фамилию'
        },
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
        confirmPassword: {
            label: "Подтверждение пароля",
            required: true,
            placeholder: ''
        },
        confirm: 'Зарегистрироваться',
        registeredAlready: {
            title: 'Уже зарегистрированы?',
            goto: "Войти"
        },
        registrationType: {
            personal: 'Для себя',
            business: 'Для бизнеса'
        }
    }

    public registrationViewModel = computed(() => {
        const registration = this._authenticationLocalRepository.getRegistration().value;
        if (!registration) {
            return null;
        }

        return new RegistrationViewModel(registration)
    });
}
