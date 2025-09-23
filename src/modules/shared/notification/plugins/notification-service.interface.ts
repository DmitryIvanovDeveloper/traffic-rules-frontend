export interface INotificationUseCases {
    success(message: string): void;
    error(message: string): void;
  }