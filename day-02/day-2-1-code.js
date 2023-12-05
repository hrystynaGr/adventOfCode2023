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

readFile('./input-data-test.txt', (finishedGames) => {
    const arrayOfTruesAndFalses = formatInputSplitIntoGames(finishedGames);
    findMaxOfColor(arrayOfTruesAndFalses);
});

function formatInputSplitIntoGames(finishedGames) {
    return finishedGames
        .replace(/[;:]/g, ',')
        .split('\n')
        .map(game => {
            let red = [];
            let green = [];
            let blue = [];
            game.split(', ').forEach((el, index) => {
                el = el.split(' ')
                if (index) {
                    if (el[1] === 'red') {
                        red.push(+el[0])
                    }
                    else if (el[1] === 'green') {
                        green.push(+el[0])
                    }
                    else if (el[1] === 'blue') {
                        blue.push(+el[0])
                    }
                }
                else {
                    return el;
                }
            })
            return [red,green,blue]
        });
}

function findMaxOfColor(data) {
    let res = data.map(game => game.map(color => Math.max(...color)).reduce((el, acc) => el * acc)).reduce((el,acc) => el + acc);
    console.log(res);
}
