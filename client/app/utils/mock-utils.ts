const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export function simulateFetch(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, getRandomNumber(0, 1500)));
}