import { useToast } from 'primevue/usetoast';

export const useNotification = () => {
    const toast = useToast();

    return {
        success: (message: string, title = 'Успешно') => {
            toast.add({ severity: 'success', summary: title, detail: message, life: 3000 });
        },
        error: (message: string, title = 'Ошибка') => {
            toast.add({ severity: 'error', summary: title, detail: message, life: 5000 });
        },
        info: (message: string, title = 'Информация') => {
            toast.add({ severity: 'info', summary: title, detail: message, life: 4000 });
        },
    };
};
