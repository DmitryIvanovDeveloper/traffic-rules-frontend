import { useToast } from 'primevue/usetoast';

export class ToastNotification {
    
    static showSuccess(message: string, title = 'Успешно') {
        const toast = useToast();
        toast.add({ severity: 'success', summary: title, detail: message, life: 3000 });
    }

    static showError(message: string, title = 'Ошибка') {
        const toast = useToast();
        toast.add({ severity: 'error', summary: title, detail: message, life: 5000 });
    }

    static showInfo(message: string, title = 'Информация') {
        const toast = useToast();
        toast.add({ severity: 'info', summary: title, detail: message, life: 4000 });
    }
}
