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

readFile('./input-data.txt', (finishedGames) => {
    const arrayOfTruesAndFalses = formatInputSplitIntoGames(finishedGames);
    zeroForWrongIndexForCorrect(arrayOfTruesAndFalses);
});

function formatInputSplitIntoGames(finishedGames) {
    return finishedGames
        .replace(/[;:]/g, ',')
        .split('\n')
        .map(game => {
            return divideToColorNumberPairs(game);
        });
}

function divideToColorNumberPairs(game) {
    return game.split(', ').map((entry, index) => {
        return modifyColorNumberPairs(entry, index)
    });
}

function modifyColorNumberPairs(entry, index) {
    entry = entry.split(' ');
    if (index) {
        return isCorrectNumberOfColor(entry);
    }
    else {
        return entry[1];
    }
}

function isCorrectNumberOfColor([number, color]) {
    if (color === 'red') return isCorrectNumberOfRed(number);
    else if (color === 'green') return isCorrectNumberOfGreen(number);
    else if (color === 'blue') return isCorrectNumberOfBlue(number);
}

function isCorrectNumberOfRed(number) {
    return number <= 12;
}

function isCorrectNumberOfGreen(number) {
    return number <= 13;
}

function isCorrectNumberOfBlue(number) {
    return number <= 14;
}

function zeroForWrongIndexForCorrect(data) {
    const res = data.map(game => {
        if (game.some(el => el === false)) {
            return 0;
        }
        else {
            return +game[0];
        }
    })
    calculateSumOfIndexes(res);
}

function calculateSumOfIndexes(data) {
    console.log(data.reduce((el, acc) => el + acc))
}