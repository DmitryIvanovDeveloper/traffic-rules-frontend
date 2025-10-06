const TYPES = {
    ModelVariantsHttpRepository: Symbol.for('ModelVariantsHttpRepository'),
    ModelVariantsLocalRepository: Symbol.for('ModelVariantsLocalRepository'),
    CreateModelVariantUseCase: Symbol.for('CreateModelVariantUseCase'),
    UpdateModelVariantUseCase: Symbol.for('UpdateModelVariantUseCase'),
    DeleteModelVariantUseCase: Symbol.for('DeleteModelVariantUseCase'),
    DeleteModelVariantsByModelIdUseCase: Symbol.for('DeleteModelVariantsByModelIdUseCase'),
    LoadModelVariantsUseCase: Symbol.for('LoadModelVariantsUseCase'),
    SelectModelVariantUseCase: Symbol.for('SelectModelVariantUseCase'),
    ClearModelVariantsLocalUseCase: Symbol.for('ClearModelVariantsLocalUseCase'),
    ModelVariantsController: Symbol.for('ModelVariantsController'),
    ModelVariantsPresenter: Symbol.for('ModelVariantsPresenter'),
    CustomModelSelectedEventHandler: Symbol.for('IAsyncEventHandler<CustomModelSelectedEvent>'),
    ProjectSelectedEventHandlerSync: Symbol.for('ISyncEventHandler<ProjectSelectedEvent>'),
};

const NAMES = {
    ModelVariantsHttpRepository: 'ModelVariantsHttpRepository',
    ModelVariantsLocalRepository: 'ModelVariantsLocalRepository',
};

export { TYPES, NAMES };

