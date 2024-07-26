export const sum = (first, second) => {
    return first + second;
}

export const sumAll = (numbers) => {
    let total = 0;
    for (numbers of numbers) {
        total += numbers;
    }
    return total;
}

export const calculate = (numbers, callback) => {
    let total = 0;
    for (numbers of numbers) {
        total += numbers;
    }
    callback(total);
}

export const calculateAndReturn = (numbers, callback) => {
    let total = 0;
    for (numbers of numbers) {
        total += numbers;
    }
    return callback(total);
}