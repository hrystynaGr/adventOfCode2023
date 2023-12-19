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
    const result = countWinningCombos(arrays[0], arrays[1]);
    console.log(result);
}

function formatInput(string) {
    return string
        .split('\n')
        .map(line => line.replace(/\D/g, ''))
        .filter(Boolean)
        .map(Number);
}

function countWinningCombos(seconds, result) {
    let n = parseInt(seconds / 2);
    const even = isEven(seconds);
    const winArr = [];
    while (n !== 0) {
        if (n * (seconds - n) > result) {
            winArr.push(n * (seconds - n))
        }
        n--;
    }
    const doubleLength = winArr.length * 2;
    return even ? doubleLength - 1 : doubleLength;
}

function isEven(num) {
    return num % 2 === 0
}