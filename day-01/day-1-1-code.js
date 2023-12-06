const fs = require('fs');

const numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function readFile(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
        } else {
            callback(data);
        }
    });
}

readFile('./input-data-2.txt', (finishedGames) => {
    const numPositionsFromStart = arrOfPositionsOfFirstNumValues(finishedGames);
    const numPositionsFromEnd = arrOfPositionsOfLastNumValues(finishedGames);
    const arrOfFirstDigits = arrOfFirstNumValues(numPositionsFromStart)
    const arrOfLastDigits = arrOflastNumValues(numPositionsFromEnd);
    const first = decodedArr(arrOfFirstDigits);
    const last = decodedArr(arrOfLastDigits);
    const combined = combineTwoArrs(first, last)
    const summedUp = sumUpElemntsOfArray(combined)
    console.log(summedUp);
});

function arrOfPositionsOfLastNumValues(data) {
    return splitToArr(data, '\n').map((calibrationCode) => {
        return positionsOfLastNum(calibrationCode);
    })
}

function splitToArr(string, separator) {
    return string.split(separator)
}

function positionsOfLastNum(string) {
    return numbers.map((num) => {
        return string.lastIndexOf(num)
    })
}

function arrOfPositionsOfFirstNumValues(data) {
    return splitToArr(data, '\n').map((calibrationCode) => {
        return positionsOfFirstNum(calibrationCode);
    })
}

function positionsOfFirstNum(string) {
    return numbers.map((num) => {
        return string.indexOf(num)
    })
}

function arrOflastNumValues(arr) {
    return arr.map((el) => positionOfMaxValueInTheArr(el))
}

function positionOfMaxValueInTheArr(arr) {
    return arr.indexOf(Math.max(...arr))
}

function decodedArr(arr) {
    return arr.map((el) => el >= 10 ? el - 10 : el)
}

function arrOfFirstNumValues(arr) {
    return arr.map((el) => positionOfMinValueInTheArr(el))
}

function positionOfMinValueInTheArr(arr) {
    const fixedArr = arr.map(el => el === -1 ? 9999 : el);
    return fixedArr.indexOf(Math.min(...fixedArr))
}

function combineTwoArrs(first, last) {
    return first.map((el, index) => '' + el + last[index])
}

function sumUpElemntsOfArray(array) {
    return array.reduce((el, acc) => +el + +acc);
}
