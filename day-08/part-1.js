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
    const startValues = processInputData(finishedGames);
    const stepsCount = countSteps(startValues);
    console.log(stepsCount)

});

function processInputData(string) {
    const graph = string.split('\n');
    graph.splice(1, 1);
    const instructions = graph.splice(0, 1)[0]
        .replaceAll('L', 0)
        .replaceAll('R', 1)
        .split('');
    const graphMap = new Map();

    while (graph.length) {
        const elem = graph.pop().split('=');
        const node = elem[0].replaceAll(' ', '');
        const neigbors = elem[1]
            .replaceAll(' ', '')
            .replace('(', '')
            .replace(')', '')
            .split(',');
        graphMap.set(node, neigbors)
    }
    return [instructions, graphMap];
}

function countSteps(data) {
    const [instructions, graph] = data;
    let start = 'AAA';
    let elem = '';
    let count = 0;

    while (elem != 'ZZZ') {
        for (const rule of instructions) {
            elem = graph.get(start)[+rule]
            start = elem;
            count++;
        }
    }

    return count;
}



