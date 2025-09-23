import { INotificationUseCases } from '../../plugins/notification-service.interface';
import { ToastServiceMethods } from 'primevue';

export class ToastNotificationUseCases implements INotificationUseCases {
    private toast: ToastServiceMethods | null = null;

    public setToast(toast: ToastServiceMethods) {
        this.toast = toast;
    }

    public success(message: string): void {
        if (!this.toast) {
            return;
        }

        this.toast.add({ severity: 'success', summary: 'Успешно', detail: message, life: 5000 });
    }

    public error(message: string): void {

        if (!this.toast) {
            return;
        }
        
        this.toast.add({ severity: 'error', summary: 'Ошибка', detail: message, life: 5000 });
    }

    public warn(message: string): void {
        if (!this.toast) {
            return;
        }
        
        this.toast.add({ severity: 'warn', summary: 'Внимание', detail: message, life: 5000 });
    }
}
