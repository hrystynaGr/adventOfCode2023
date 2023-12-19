const fs = require('fs');
const order = ['A', 'K', 'Q', 'J', 'T', 9, 8, 7, 6, 5, 4, 3, 2]

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
    const hands = returnElems(arrays, 0);
    const bids = returnElems(arrays, 1);
    const handsBids = mappedHandsBids(hands, bids);
    const sortedHands = sortHands(hands);
    const multipliedRanks = multyplyRanks(sortedHands, handsBids);
    console.log(multipliedRanks);
}

function formatInput(string) {
    return string
        .split('\n')
        .map(el => el.split(' '))
}

function mappedHandsBids(hands, bids) {
    let mappedHandsToBids = new Map();
    hands.forEach((hand, index) => mappedHandsToBids.set(hand, bids[index]));
    return mappedHandsToBids;
}

function returnElems(arr, index) {
    return arr.map((el) => el[index])
}

function sortHands(hands) {
    let newHands = [...hands];
    return newHands.sort((a, b) => {
        const aType = determineTypeOfHand(a);
        const bType = determineTypeOfHand(b);
        if (aType > bType) return 1;
        else if (aType < bType) return -1;
        else {
            return compareChars(a, b)
        }
    })
}

function determineTypeOfHand(hand) {
    const uniqueChars = new Set(hand).size;
    switch (uniqueChars) {
        case 1:
            return 1; // 'FiveOfAKind';
        case 2:
            return repeatingOccurences(hand, 4) ? 2 : 3; // 'FourOfAKind' : 'FullHouse';
        case 3:
            return repeatingOccurences(hand, 3) ? 4 : 5; // 'ThreeOfAKind' : 'TwoPairs';
        case 4:
            return 6; // 'OnePair';
        default:
            return 7; // 'HighCard';
    }
}

function repeatingOccurences(inputString, times) {
    const threeOccurrences = new Set();
    for (const char of inputString) {
        if (threeOccurrences.has(char)) {
            return true;
        }
        if (inputString.split(char).length - 1 >= times) {
            threeOccurrences.add(char);
        }
    }
    return false;
}

function compareChars(a, b) {
    const length = a.length;
    let n = 0;
    while (n <= length) {
        const aInd = findElemIndex(a[n]);
        const bInd = findElemIndex(b[n]);
        if (aInd < bInd) {
            return -1;
        }
        else if (aInd > bInd) {
            return 1;
        }
        n++;
    }
}

function findElemIndex(elem) {
    return order.findIndex(el => el == elem);
}

function multyplyRanks(sortedHands, handsBids) {
    return sortedHands
        .map((el, index) => handsBids.get(el) * (sortedHands.length - index))
        .reduce((a, b) => a + b)
}