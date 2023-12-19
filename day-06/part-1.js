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
    processInputData(finishedGames);
});

function processInputData(string) {
    const arrays = formatInput(string);
    const combinationsArr = arrayOfWinningCombos(arrays[0], arrays[1]);
    const ways = countWinningCombos(combinationsArr, arrays[0])
    const result = multiplyArrayElems(ways);
    console.log(result);
}

function formatInput(string) {
    return string.split('\n')
        .map(el => el.split(' '))
        .map(el => el.filter(k => Boolean(+k)))
        .map(el => el.map(el => +el))
}

function arrayOfWinningCombos(seconds, recordDist) {
    return seconds.map((el, index) => {
        let n = parseInt(el / 2)
        const winArr = [];
        const distance = n * (el - n)
        while (n !== 0) {
            if (distance > recordDist[index]) {
                winArr.push(distance)
            }
            n--;
        }
        return winArr
    })
}

function countWinningCombos(combinationsArr, inputArr) {
    return combinationsArr.map((el, index) => {
        const even = isEven(inputArr[index]);
        const doubleLength = el.length * 2;
        return even ? doubleLength - 1 : doubleLength;
    })
}

function multiplyArrayElems(arr) {
    return arr.reduce((el, acc) => el * acc)
}

function isEven(num) {
    return num % 2 === 0
}