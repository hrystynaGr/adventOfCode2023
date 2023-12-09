// const fs = require('fs');

// function readFile(file, callback) {
//     fs.readFile(file, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error:', err);
//         } else {
//             callback(data);
//         }
//     });
// }

// readFile('./input.txt', (finishedGames) => {
//     processInputData(finishedGames);
// });

// function processInputData(string) {
//     const arrays = formatInput(string);
//     const amountOfWinNums = amountofWinNumbersInEachCard(arrays);
//     const amountOfWinPoints = amountOfPoints(amountOfWinNums);
//     const res = sumOfPoints(amountOfWinPoints);

//     console.log(' amountofWinNumbersInEachCard',res)
// }

function findLowestLocation(seedNumbers, maps) {
    const mapping = {};

    const applyMap = (destStart, sourceStart, rangeLength) => {
        for (let i = 0; i < rangeLength; i++) {
            mapping[sourceStart + i] = destStart + i;
        }
    };

    maps.forEach(map => {
        const [destStart, sourceStart, rangeLength] = map;
        applyMap(destStart, sourceStart, rangeLength);
    });

    const findLowestLocationForSeed = seedNumber => {
        let currentNumber = seedNumber;
        const visited = new Set();
        console.log(mapping)

        while (mapping[currentNumber] !== undefined && !visited.has(currentNumber)) {
            visited.add(currentNumber);
            currentNumber = mapping[currentNumber];
        }

        return currentNumber;
    };

    const lowestLocations = seedNumbers.map(findLowestLocationForSeed);

    return Math.min(...lowestLocations);
}


// Example input
const seedNumbers = [79, 14, 55, 13];
const maps = [
    [50, 98, 2],
    [52, 50, 48],
    [0, 15, 37],
    [37, 52, 2],
    [39, 0, 15],
    [49, 53, 8],
    [0, 11, 42],
    [42, 0, 7],
    [57, 7, 4],
    [88, 18, 7],
    [18, 25, 70],
    [45, 77, 23],
    [81, 45, 19],
    [68, 64, 13],
    [0, 69, 1],
    [1, 0, 69],
    [60, 56, 37],
    [56, 93, 4]
];

// Find and print the lowest location number
const lowestLocation = findLowestLocation(seedNumbers, maps);
console.log("Lowest Location Number:", lowestLocation);