import { TYPES } from '../../types';
import AuthenticationHttpRepository from '../repositories/authentication-repository/authentication.http.repository';
import RegistrationController from '../../presentation/controller/registration.controller';
import IRegistrationPresenter from '../../business/plugins/registration.presenter.interface';
import LoginPresenter from '../../presentation/presenter/login.presenter';
import LoginController from '../../presentation/controller/login.controller';
import IAuthenticationHttpRepository from '../../business/plugins/authentication.http.repository.plugin';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import RegistrationPresenter from '../../presentation/presenter/registration.presenter';
import TrySignInUseCase from '../../business/usecases/try-sign-in.usecase';
import TrySignUpUseCase from '../../business/usecases/try-sign-up.usecase';
import IAuthenticationLocalRepository from '../../business/plugins/authentication.local.repository.plugin';
import AuthenticationLocalRepository from '../repositories/authentication-repository/authentication.local.repository';

container
    .bind<IAuthenticationHttpRepository>(TYPES.AuthenticationHttpRepository)
    .to(AuthenticationHttpRepository)
    .inSingletonScope()
;

container
    .bind<IAuthenticationLocalRepository>(TYPES.AuthenticationLocalRepository)
    .to(AuthenticationLocalRepository)
    .inSingletonScope()
;

container
    .bind<IRegistrationPresenter>(TYPES.RegistrationPresenter)
    .to(RegistrationPresenter)
    .inSingletonScope()
;

container
    .bind<RegistrationController>(TYPES.RegistrationController)
    .to(RegistrationController)
    .inSingletonScope()
;

container
    .bind<LoginPresenter>(TYPES.LoginPresenter)
    .to(LoginPresenter)
    .inSingletonScope()
;

container
    .bind<LoginController>(TYPES.LoginController)
    .to(LoginController)
    .inSingletonScope()
;

container
    .bind<TrySignInUseCase>(TYPES.TrySignInUseCase)
    .to(TrySignInUseCase)
    .inTransientScope()
;

container
    .bind<TrySignUpUseCase>(TYPES.TrySignUpUseCase)
    .to(TrySignUpUseCase)
    .inTransientScope()
;

