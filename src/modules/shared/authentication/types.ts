const TYPES = {
    AuthenticationHttpRepository: Symbol.for('AuthenticationHttpRepository'),
    AuthenticationLocalRepository: Symbol.for('AuthenticationLocalRepository'),
    RegistrationPresenter: Symbol.for('RegistrationPresenter'),
    TrySignUpUseCase: Symbol.for('TrySignUpUseCase'),
    TrySignInUseCase: Symbol.for('TrySignInUseCase'),
    RegistrationController: Symbol.for('RegistrationController'),
    SubscribeOnCodeSendedAllowCompleteRegistrationUseCase: Symbol.for('SubscribeOnCodeSendedAllowCompleteRegistrationUseCase'),
    LoginPresenter: Symbol.for('LoginPresenter'),
    LoginController: Symbol.for('LoginController'),
};

export { TYPES };
