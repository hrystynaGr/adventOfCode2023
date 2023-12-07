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