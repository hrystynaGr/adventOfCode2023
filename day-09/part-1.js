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

readFile('./input-1.txt', (finishedGames) => {
    const startValues = processInputData(finishedGames);
    const nextValues = lastValuesOfEachStep(startValues);
    console.log(nextValues)

});

function processInputData(string) {
    return string.split('\n').map((el) => el.split(' '));
}

function lastValuesOfEachStep(start) {
    return start.map((arr) => {
        return findNextValue(arr);
    }).reduce((a, b) => a + b)

}

function findNextValue(arr) {
    const lastVals = [];
    let currSet = arr;
    let indx = 0;
    lastVals.push(+currSet[currSet.length - 1])
    while (!allZeroes(currSet) || currSet.length == 0) {
        while (indx < currSet.length - 1) {
            currSet[indx] = +currSet[indx + 1] - +currSet[indx];
            indx++;
        }
        indx = 0;
        currSet.splice(-1)
        lastVals.push(currSet[currSet.length - 1])
    }
    return lastVals.reduce((a, b) => a + b);
}

function allZeroes(start) {
    return start.every((el) => el === 0);
}
