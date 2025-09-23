import filterNotDigitalSymbols from './formatter';

export function formatPhoneNumber(phoneNumber: string): string {
    let phone = filterNotDigitalSymbols(phoneNumber);

    if (!phone) {
        return phone;
    }

    if (/^[1-6890]/.test(phone[0])) {
        phone = `7${phone}`;
    }
    // Применяем форматирование
    if (phone.length <= 1) {
        return `+${phone}`;
    }

    if (phone.length <= 4) {
        return `+${phone[0]} (${phone.slice(1)}`;
    }

    if (phone.length <= 7) {
        return `+${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(4)}`;
    }

    if (phone.length <= 9) {
        return `+${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
    }

    return `+${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
}

export function removePhoneNotDigitalSymbols(value: string): string {
    let phone = filterNotDigitalSymbols(value);

    if (phone.startsWith('7')) {
        phone = `7${phone.slice(1)}`;
    }

    return phone;
}

export function filterCyrillic(text: string): string {
    return text.replace(/[^а-яА-ЯёЁ]/g, '');
}

export function filterStreet(text: string): string {
    return text.replace(/[^а-яА-ЯёЁ0-9\s.,\-]/g, '')
}
