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
    const cardsNum = addCards(amountOfWinNums);
    const res = sumOfCards(cardsNum);
    console.log('cardsNum', cardsNum, res);
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

function addCards(arr) {
    let cards = Array(arr.length).fill(1)
    arr.forEach((el, index) => {
        let n = 1;
        while (n <= el) {
            if (index + n <= cards.length) {
                cards[index + n] = cards[index + n] + cards[index];
            }
            else {
                cards.push(1);
            }
            n++;
        }
    })
    return cards;
}

function sumOfCards(arr) {
    return arr.reduce((el, acc) => el + acc);
}