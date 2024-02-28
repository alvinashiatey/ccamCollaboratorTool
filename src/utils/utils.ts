const debounce = (fn: Function, delay: number = 100, maxWait:number = 300) => {
    let timer: number | undefined, maxTimer: number | undefined;
    return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        clearTimeout(maxTimer);
        maxTimer = undefined
        fn(...args);
    }, delay);
    if (!maxWait) {
        maxTimer = setTimeout(() => {
            clearTimeout(timer)
            maxTimer = undefined
            fn(...args);
        }, maxWait);
    }
    }
}

const wait = (ms: number)=> new Promise((resolve) => setTimeout(resolve, ms));

//fisher-yates shuffle

function shuffle<T>(array: T[]): T[]{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// remove empty string and null from array
function removeEmpty<T>(array: T[]): T[]{
    return array.filter((item) => item !== null && item !== "");
}

// map range to another range
function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export { debounce, wait, shuffle, removeEmpty, mapRange }