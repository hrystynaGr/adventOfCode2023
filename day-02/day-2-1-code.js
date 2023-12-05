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
    const arraysOfColors = formatInputSortColors(finishedGames);
    console.log(findMaxOfColor(arraysOfColors));
});

function formatInputSortColors(finishedGames) {
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
                        pushToColor(red, +el[0])
                    }
                    else if (el[1] === 'green') {
                        pushToColor(green, +el[0])
                    }
                    else if (el[1] === 'blue') {
                        pushToColor(blue, +el[0])
                    }
                }
            })
            return [red, green, blue]
        });
}

function pushToColor(arr, el) {
    arr.push(el)
}

function findMaxOfColor(data) {
    return data.map(game => game.map(color => findMaxElOfColorArray(color))
        .reduce((el, acc) => el * acc))
        .reduce((el, acc) => el + acc);
}

function findMaxElOfColorArray(arr) {
    return Math.max(...arr);
}
