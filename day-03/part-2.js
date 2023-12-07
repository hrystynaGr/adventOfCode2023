const fs = require('fs');

const pattern = /[0-9]+/;

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
    processGearShema(finishedGames)
});

function processGearShema(stringGearShema) {
    const gearShemaInArrays = fromStringToArray(stringGearShema);
    global.rowLength = gearShemaInArrays[0].length
    global.columnLength = gearShemaInArrays.length

    const numbersNearStarInArrays = findNumbers(gearShemaInArrays);
    const numbersNearStarJoinedStrings = joinSubArrays(numbersNearStarInArrays);
    const numbersNearStarInt = transformElemntOfArrsToNums(numbersNearStarJoinedStrings);
    const withoutZeroes = removeZeroes(numbersNearStarInt);
    const twoCoordinatesNearEachStar = leaveOnlyTwoCoordinates(withoutZeroes);
    const multipliedCoordinates = multiplyCoordinates(twoCoordinatesNearEachStar)
    const sumOfAllCoordinates = sumUpAllElemsOfArray(multipliedCoordinates)
    console.log(sumOfAllCoordinates);
}

function fromStringToArray(string) {
    return string.split('\n').map((arr) => arr.split(''))
}

function findNumbers(arr) {
    const res = [];
    arr.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell == '*') {
                const coordinatesSet = [];
                const rowIndAbove = rowIndex - 1;
                const rowIndBelow = rowIndex + 1;
                //check if there is number to the right
                const r = numsToTheRight(arr, rowIndex, columnIndex)
                coordinatesSet.push(r)
                //check if there is number to the left
                const l = numsToTheLeft(arr, rowIndex, columnIndex)
                coordinatesSet.push(l)
                // check if there is numbers on top row from star
                if ((rowIndAbove) >= 0) {
                    retrieveDiagonalNums(arr, rowIndAbove, columnIndex, coordinatesSet)
                }
                // check if there is number on bottom row from the star
                if ((rowIndBelow) < global.columnLength) {
                    retrieveDiagonalNums(arr, rowIndBelow, columnIndex, coordinatesSet)
                }
                res.push(coordinatesSet);
            }

        })
    })
    return res;
}

function numsToTheRight(arr, rowIndex, columnIndex) {
    const rightNum = [];
    let n = 1;
    while (columnIndex + n !== global.rowLength && arr[rowIndex][columnIndex + n].match(pattern)) {
        rightNum.push(arr[rowIndex][columnIndex + n])
        arr[rowIndex][columnIndex + n] = '.'
        n++;
    }
    return rightNum
}

function numsToTheLeft(arr, rowIndex, columnIndex) {
    const leftNum = [];
    let l = 1;
    while (columnIndex - l !== -1 && arr[rowIndex][columnIndex - l].match(pattern)) {
        leftNum.unshift(arr[rowIndex][columnIndex - l])
        arr[rowIndex][columnIndex - l] = '.'
        l++;
    }
    return leftNum;
}

function retrieveDiagonalNums(arr, rowIndex, columnIndex, coordinatesSet) {
    if (isNumber(arr, rowIndex, columnIndex)) {
        retrieveAndPush(arr, rowIndex, columnIndex, coordinatesSet)
    }
    else if (isNumber(arr, rowIndex, columnIndex - 1) || isNumber(arr, rowIndex, columnIndex + 1)) {
        // check element diagonally to the right from the star
        checkAndRetrieve(arr, rowIndex, columnIndex + 1, coordinatesSet)
        // check element diagonally to the left from the star
        checkAndRetrieve(arr, rowIndex, columnIndex - 1, coordinatesSet)
    }
}

function isNumber(arr, rowIndex, columnIndex) {
    return arr[rowIndex][columnIndex].match(pattern)
}

function checkAndRetrieve(arr, rowIndex, columnIndex, coordinatesSet) {
    if (isWithinRange(columnIndex) && isNumber(arr, rowIndex, columnIndex)) {
        retrieveAndPush(arr, rowIndex, columnIndex, coordinatesSet)
    }
}

function isWithinRange(columnIndex) {
    return columnIndex < global.rowLength && columnIndex >= 0
}

function retrieveAndPush(arr, rowIndex, columnIndex, coordinatesSet) {
    const t = retrieveWholeNumber(arr, rowIndex, columnIndex)
    coordinatesSet.push(t)
}

function retrieveWholeNumber(arr, rowIndex, columnIndex) {
    let topNum = [];
    topNum.push(arr[rowIndex][columnIndex]);
    arr[rowIndex][columnIndex] = '.'
    const right = numsToTheRight(arr, rowIndex, columnIndex);
    const left = numsToTheLeft(arr, rowIndex, columnIndex);
    topNum = left.concat(topNum);
    topNum = topNum.concat(right);
    return topNum;
}

function joinSubArrays(arr) {
    return arr.map(el => el.map(num => num.join('')))
}

function transformElemntOfArrsToNums(arr) {
    return arr.map((el) => el.map(num => +num))
}

function removeZeroes(arr) {
    return arr.map(el => el.filter(num => Boolean(num)))
}

function leaveOnlyTwoCoordinates(arr) {
    return arr.filter((el) => el.length === 2)
}

function multiplyCoordinates(arr) {
    return arr.map((el) => el[0] * el[1])
}

function sumUpAllElemsOfArray(arr) {
    return arr.reduce((el, acc) => el + acc)
}