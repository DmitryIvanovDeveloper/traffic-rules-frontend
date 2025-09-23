import moment from 'moment';

export function formattTimerMMSS(seconds: number): string {
    return moment.utc(seconds * 1000).format('mm:ss');
}