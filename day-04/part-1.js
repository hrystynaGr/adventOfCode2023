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
    const amountOfWinNums = amountofWinNumbersInEachCard(arrays);
    const amountOfWinPoints = amountOfPoints(amountOfWinNums);
    const res = sumOfPoints(amountOfWinPoints);

    console.log(' amountofWinNumbersInEachCard',res)
}

function formatInput(string) {
    return string.split('\n')
        .map((line) => line.split('|'))
        .map((el) => el.map(st => st.split(' ')))
        .map((el) => el.map(st => st.filter(el => Boolean(el))))
        .map((el) => el.map((st, index) => {
            if (!index) {
                st.splice(0, 2);
            }
            return st;
        }));
}

function amountofWinNumbersInEachCard(arr) {
    let res = [];
    arr.forEach((card) => {
        let count = 0;
        let ind = card[1].length - 1;
        while (ind + 1) {
            if (card[0].includes(card[1][ind])) {
                count++;
            }
            ind--;
        }
        res.push(count);
    })
    return res;
}

function amountOfPoints(arr) {
    return arr.map(el => el ? Math.pow(2, el - 1) : el);
}

function sumOfPoints(arr) {
    return arr.reduce((el, acc) => el + acc);
}