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

readFile('./input-test.txt', (finishedGames) => {
    processInputData(finishedGames);
});

function processInputData(string) {
    const arrays = formatInput(string);
    const seeds = extractSeedsArray(arrays);
    const maps = extractMapsArrays(arrays);
    const locations = arrOfLocations(seeds, maps)
    const result = findMin(locations);
    console.log(result);
}

function formatInput(string) {
    return string.split('\n')
}

function extractSeedsArray(arr) {
    return arr[0]
        .split(': ')[1]
        .split(' ')
        .map(el => +el);
}

function extractMapsArrays(arr) {
    return arr.reduce((result, el) => {
        if (el) {
            const values = el.split(' ').map(Number);
            if (!isNaN(values[0])) {
                result[result.length - 1].push(values);
            }
        } else {
            result.push([]);
        }
        return result;
    }, []).filter(subArr => subArr.length > 0);
}

function arrOfLocations(seeds, maps) {
    return seeds.map(seed => applyMapsToSeed(seed, maps))
}

function applyMapsToSeed(seed, maps) {
    return maps.reduce(((a, b) => {
        return onFindOfElements(a, b)
    }), seed)
}

function onFindOfElements(element, mapsList) {
    let res = mapsList.map((map =>
        transformElemToAnother(element, map))).filter((el) => el != element
        )
    if (!res.length) {
        return element
    }
    else {
        return res[0]
    }
}

function transformElemToAnother(element, map) {
    if (element <= map[1] + map[2] - 1 && element >= map[1]) {
        return (element - map[1]) + map[0];
    }
    else {
        return element
    }
}

function findMin(locations) {
    return Math.min(...locations)
}