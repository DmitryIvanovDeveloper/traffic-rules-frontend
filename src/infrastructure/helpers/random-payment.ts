export default function getRandomSum(): number {
    const min = 100;
    const max = 2000;
    const factor = Math.pow(10, 2);
    const random = Math.random() * (max - min) + min;
    return (Math.round(random * factor) / factor);
}

