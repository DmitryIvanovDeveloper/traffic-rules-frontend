export function formatMoney(amount: number): string {
    const rubles = Math.floor(amount / 100);
    const kopecks = amount % 100;

    const formattedRubles = rubles.toLocaleString('ru-RU');
    const formattedKopecks = kopecks.toString().padStart(2, '0');
    return `${formattedRubles},${formattedKopecks}`;
}

export function formatToKopecks(value: number): number {
    return value % 1 !== 0 
        ? Math.floor(value * 100) 
        : value
    ;
}

export default function filterNotDigitalSymbols(value: string): string {
    return value.replace(/\D/g, '');
}

export  function filterSumSymbols(value: string): string {
    return value.replace(/[^\d.,]/g, '');
}

export function capitalizeFirstLetter(text: string): string {
    if (!text) {
        return text;
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

