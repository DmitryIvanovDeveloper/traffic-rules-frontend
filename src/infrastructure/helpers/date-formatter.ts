import moment from 'moment';
import { AppError } from '../errors/app.error';
import { Period } from '@/modules/personal/payments-history/business/entities/period';

export function formatDateToLongMYYYY(date: Date): string {
    const month = date.toLocaleString('ru', { month: 'long' });
    return `${capitalize(month)} ${date.getFullYear()}`;
}
export function formateDateDDMMYYYYHHMM(date: Date): string {
    return moment(date).format('DD-MM-YYYY HH:mm')
}

export function formateDateMMYY(monthYear: string, divider: '/'| '.'): string {
    const date = moment(new Date(monthYear), 'MMMM YYYY');
    return date.format(`MM${divider}YY`); 
}

export function formateDateMMYYYY(monthYear: string, divider: '/'| '.'): string {
    const date = moment(new Date(monthYear), 'MMMM YYYY');
    return date.format(`MM${divider}YYYY`); 
}

export function parseMonthYear(dateString: string): Date {

    const [month, year] = dateString.split(/[/\.]/).map(Number);
    
    if (!month || !year || month < 1 || month > 12) {
        throw new AppError('The date is not vald', ''); // Возвращаем null, если формат неверный
    }

    return new Date(year, month - 1, 1); // Первый день указанного месяца
}

export function formateMonthYearToMMYYYY(monthYear: string): string {
    if (!monthYear) {
        return monthYear;
    }
    const months: { [key: string]: number } = {
        'январь': 1, 'февраль': 2, 'март': 3, 'апрель': 4, 'май': 5, 'июнь': 6,
        'июль': 7, 'август': 8, 'сентябрь': 9, 'октябрь': 10, 'ноябрь': 11, 'декабрь': 12
    };

    const [month, year] = monthYear.split(' ');
    const monthNumber = months[month.toLowerCase()];

    if (!monthNumber || !year) throw new Error('Некорректный формат даты');

    return `${String(monthNumber).padStart(2, '0')}/${year}`;
}

function capitalize(value: string): string {
    return  value.charAt(0).toUpperCase() + value.slice(1);
}

export function getMonthsAgo(period: Period): number {
    return {
        [Period.Year]: 12,
        [Period.HalfYear]: 6,
        [Period.Quarter]: 3,
        [Period.All]: 0
    }[period] || 0;
}

export function getStartOfMonthAgo(monthsAgo: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo, 1); 
    date.setHours(0, 0, 0, 0);
    return date;
}

