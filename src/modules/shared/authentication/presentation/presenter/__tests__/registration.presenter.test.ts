import { describe, expect, it } from 'vitest';
import RegistrationPresenter from '../registration.presenter';
import AuthenticationError from '../../../business/errors/authentication.error';
import CodeNotValidError from '../../../business/errors/code-not-valid';

describe('RegistartionPresenter', () => {
    const registrationPresenter = new RegistrationPresenter();

    it('should present error if "Verefication Code" is not valid', () => {
        const errors = new Array<AuthenticationError>(new CodeNotValidError());

        registrationPresenter.presentCredentialsErrors(errors);
        expect(registrationPresenter.labels.code.error).toBe(`Неверный код верификации`);
    });
});
