const TYPES = {
    HttpClient: Symbol.for('HttpClient'),
    ToastNotificationUseCases: Symbol.for('ToastNotificationUseCases'),
    AuthTokenUseCases: Symbol.for('AuthTokenUseCases'),
    AuthStorageRepository: Symbol.for('AuthStorageRepository'),
    EventBus: Symbol.for('EventBus'),
};

const NAMES = {
    LocalStorageRespository: 'LocalStorageRespository',
    SessionStorageRespository: 'PaymentsHistoryPreviewPresenter',
    CookieStorageRespository: 'CookieStorageRespository',
};

export { TYPES, NAMES };
