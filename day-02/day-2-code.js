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
    let res = finishedGames
        .replace(/[;:]/g, ',')
        .split('\n')
        .map(game => {
            return game.split(', ').map((entry, index) => {
                if (index) {
                    const [number, color] = entry.split(' ');
                    if (color === 'red') return number <= 12;
                    else if (color === 'green') return number <= 13;
                    else if (color === 'blue') return number <= 14;
                }
                else {
                    return entry;
                }
            });
        });
    checkFinalResult(res);
    // console.log(res);
});

function checkFinalResult(data) {
    const res = data.map(game => {
        if (game.some(el => el === false)) {
            return 0;
        }
        else {
            return game[0].split(' ')[1];
        }
    })
    calculateSum(res);
}

function calculateSum(data) {
    console.log(data.reduce((el, acc) => +el + +acc))
}