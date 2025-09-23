import { describe, expect, it, vi } from 'vitest';
import LoginController from '../login.controller';
import HttpClientMock from '@/infrastructure/api/http/http-clinet.mock';
import ILoginPresenter from '../../../business/plugins/login.presenter.interface';
import TrySignInUseCase from '../../../business/usecases/try-signin.usecase';
import ValidateLoginRequiredDataUseCase from '../../../business/usecases/valdiate-login-required-data.usecase';
import AuthenticationHttpRepository from '../../../infrastructure/repositories/authentication-repository/authentication.http.repository';
import LoginPresenter from '../../presenter/login.presenter';
import { ToastNotificationUseCases } from '@/modules/shared/notification/business/usecases/toast-notification.usecases';
import AuthTokenUseCases from '@/modules/shared/authStorage/business/usecases/auth-token.usecases';
import { LocalStorageRespository } from '@/modules/shared/authStorage/infrastructure/local-storage.repository';
import { CookieStorageRespository } from '@/modules/shared/authStorage/infrastructure/coockie-storage.repository';
import { SessionStorageRespository } from '@/modules/shared/authStorage/infrastructure/session-storage.repository';

describe('LoginController', () => {
    const httpClient = new HttpClientMock();
    
    const authenticationRepository = new AuthenticationHttpRepository(httpClient);
    const validateLoginRequiredDataUseCase = new ValidateLoginRequiredDataUseCase();
    const loginPresenter: ILoginPresenter = new LoginPresenter();

    const localStorageRespository = new LocalStorageRespository();
    const cookieStorageRespository = new CookieStorageRespository();
    const sessionStorageRespository = new SessionStorageRespository();

    const toastNotificationUseCases = new AuthTokenUseCases(
        localStorageRespository,
        sessionStorageRespository,
        cookieStorageRespository
    );
    const trySignInUseCase = new TrySignInUseCase(
        authenticationRepository,
        validateLoginRequiredDataUseCase,
        loginPresenter,
        toastNotificationUseCases
    )

    const loginController = new LoginController(trySignInUseCase);

    it('should set "Type" type successfull (E-mail)', () => {
        const type = 'email';

        loginController.setLoginType(type);
        expect(loginController.form.type).toBe(type);
    });

    it('should set "Type" type successfull (Phone)', () => {
        loginController.setLoginType('email');
        expect(loginController.form.type).toBe('email');
    });

    it('should set "E-mail" successfull', () => {
        const email = 'test-email@gmail.com';
        loginController.setEmail(email);
        expect(loginController.form.email).toBe(email);
    });

    it('should set "Phone" successfull', () => {
        const phone = '79516604992';
        loginController.setPhoneNumber(phone);
        expect(loginController.form.phoneNumber).toBe(phone);
    });

    it('should set "Password" successfull', () => {
        const password = '12345678';
        loginController.setPassword(password);

        expect(loginController.form.password).toBe(password);
    });

    it('should "Sign in" successfull (by E-mail)', () => {
        
        const type = 'email';
        loginController.setLoginType(type);

        const email = 'test-email@gmail.com';
        loginController.setEmail(email);

        const rememberMe = false;
        loginController.rememeberMe(false);

        vi.spyOn(trySignInUseCase, "execute");

        const password = '12345678';
        loginController.setPassword(password);

        loginController.signIn();
        expect(trySignInUseCase.execute).toBeCalledWith(type, email, password, rememberMe);
    });

    it('should "Sign in" successfull (by Phone)', () => {
        const type = 'phone';
        loginController.setLoginType(type);

        const phone = '+79516604992';
        loginController.setPhoneNumber(phone);
        
        const rememberMe = false;
        loginController.rememeberMe(false);

        vi.spyOn(trySignInUseCase, "execute");

        const password = '12345678';
        loginController.setPassword(password);

        loginController.signIn();
        expect(trySignInUseCase.execute).toBeCalledWith(type, phone, password, rememberMe);
    });
});
