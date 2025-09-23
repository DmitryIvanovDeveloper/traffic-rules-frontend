import { AppError } from '../errors/app.error';
import { container, Enviroment } from '../bootstrap/inversify.config';
import { TYPES } from '../bootstrap/types';
import { ToastNotificationUseCases } from '@/modules/shared/notification/business/usecases/toast-notification.usecases';


export default class Result<T> {
    constructor(
      public readonly isSuccess: boolean,
      public readonly data?: T,
      public readonly errors?: AppError[] | AppError | null,
      public readonly message?: string,
    ) {}
  
    public static success<U>(data?: U): Result<U> {
      return new Result<U>(true, data);
    }
  
    public static failure<U>(errors?: AppError[] | AppError | null, message?: string): Result<U> {
      if (import.meta.env.VITE_APP_ENV === Enviroment.local && errors) {
        // const toast = container.get<ToastNotificationUseCases>(TYPES.ToastNotificationUseCases);
        // toast.error(JSON.stringify(errors));
      }
      return new Result<U>(false, undefined, errors, message);
    }
  
    public hasData(): this is Result<T> & { data: T } {
      return this.isSuccess && this.data !== undefined && this.data !== null;
    }
  
    public getOrFail(): T {
      if (!this.hasData()) {
        throw new Error(this.message ?? 'Result failed or empty');
      }
      return this.data;
    }
  
    public getOrDefault(defaultValue: T): T {
      return this.hasData() ? this.data : defaultValue;
    }
  }
  