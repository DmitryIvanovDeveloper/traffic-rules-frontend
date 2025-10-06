const TYPES = {
    CustomModelsHttpRepository: Symbol.for('CustomModelsHttpRepository'),
    CustomModelsLocalRepository: Symbol.for('CustomModelsLocalRepository'),
    CreateCustomModelUseCase: Symbol.for('CreateCustomModelUseCase'),
    CreateSimpleCustomModelUseCase: Symbol.for('CreateSimpleCustomModelUseCase'),
    UpdateCustomModelUseCase: Symbol.for('UpdateCustomModelUseCase'),
    DeleteCustomModelUseCase: Symbol.for('DeleteCustomModelUseCase'),
    LoadCustomModelsUseCase: Symbol.for('LoadCustomModelsUseCase'),
    SelectCustomModelUseCase: Symbol.for('SelectCustomModelUseCase'),
    ClearCustomModelsLocalUseCase: Symbol.for('ClearCustomModelsLocalUseCase'),
    CustomModelsController: Symbol.for('CustomModelsController'),
    CustomModelsPresenter: Symbol.for('CustomModelsPresenter'),
    ProjectSelectedEventHandler: Symbol.for('IAsyncEventHandler<ProjectSelectedEvent>'),
    ProjectSelectedEventHandlerSync: Symbol.for('ISyncEventHandler<ProjectSelectedEvent>'),
};

const NAMES = {
    CustomModelsHttpRepository: 'CustomModelsHttpRepository',
    CustomModelsLocalRepository: 'CustomModelsLocalRepository',
};

export { TYPES, NAMES };
