import { describe, expect, it } from 'vitest';
import LoginPresenter from '../login.presenter';
import AuthenticationError from '../../../business/errors/authentication.error';
import AuthorizationError from '../../../business/errors/authorization.error';

describe('LoginPresenter', () => {
    const loginPresenter = new LoginPresenter();

    it('should present "AuthorizationError" error (by E-mail)', () => {
        const errors = new Array<AuthenticationError>(new AuthorizationError());
        loginPresenter.presentErrors(errors, 'email');

        expect(loginPresenter.labels.password.error).toEqual('Неверный логин или пароль');
    });
});
