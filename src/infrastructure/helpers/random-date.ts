export default function getRandomDate(): Date {
    const startTime = new Date(2020, 0, 1).getTime();
    const endTime =  new Date(2025, 11, 31).getTime();
    const randomTime = Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;
    return new Date(randomTime);
}

// Пример использования:
