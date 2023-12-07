const fs = require('fs');

function readFile(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
        } else {
            callback(data);
        }
    });
}

readFile('./input.txt', (finishedGames) => {
    const arrayResult = arrayOfFistAndLastNumbersFromString(finishedGames);
    const summedUpResult = sumUpElemntsOfArray(arrayResult);
    console.log(summedUpResult);
});

function sumUpElemntsOfArray(array) {
    return array.reduce((el, acc) => el + acc);
}

function arrayOfFistAndLastNumbersFromString(data) {
    return splitToArr(data, '\n').map((calibrationCode) => {
        return firstAndLastNumbersFromString(calibrationCode)
    })
}

function splitToArr(string, separator) {
    return string.split(separator)
}

function firstAndLastNumbersFromString(calibrationCode) {
    const first = firstNumericalValue(calibrationCode);
    const last = lastNumericalValue(calibrationCode);
    const firstConcatLast = concatenateTwoStrings(first, last);
    return numberFromString(firstConcatLast);
}

function firstNumericalValue(string) {
    return splitToArr(string, '').find((el) => el.match(/\d+/))
}

function lastNumericalValue(string) {
    return splitToArr(string, '').findLast((el) => el.match(/\d+/))
}

function concatenateTwoStrings(first, second) {
    return first + second;
}

function numberFromString(string) {
    return Number(string)
}





