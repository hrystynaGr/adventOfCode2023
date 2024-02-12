const fs = require('fs');
const { start } = require('repl');

function readFile(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
        } else {
            callback(data);
        }
    });
}

readFile('./input-2.txt', (finishedGames) => {
    const startValues = processInputData(finishedGames);
    const stepsCount = countSteps(startValues);

    console.log(leastCommonMultipleArr(...stepsCount)) // 4)

});

function processInputData(string) {
    const graph = string.split('\n');
    graph.splice(1, 1);
    const instructions = graph.splice(0, 1)[0]
        .replaceAll('L', 0)
        .replaceAll('R', 1)
        .split('');
    const graphMap = new Map();
    const keysWithA = [];

    while (graph.length) {
        const elem = graph.pop().split('=');
        const node = elem[0].replaceAll(' ', '');
        const neigbors = elem[1]
            .replaceAll(' ', '')
            .replace('(', '')
            .replace(')', '')
            .split(',');
        if (node[node.length - 1] == 'A') {
            keysWithA.push(node);
        }
        graphMap.set(node, neigbors)
    }
    console.log(keysWithA)
    return [instructions, graphMap, keysWithA];
}

function countSteps(data) {
    let [instructions, graph, starts] = data;
    let count = 0;

    while (!checkAll(starts)) {
        for (const rule of instructions) {
            const rrr = starts.map((elem) => {
                if (!Number.isInteger(elem) && elem[elem.length - 1] == 'Z') {
                    return count;
                }
                else if (!Number.isInteger(elem)) {
                    return graph.get(elem)[+rule];
                }
                else {
                    return elem;
                }
            })
            count++;
            starts = rrr;
        }
    }

    return starts;
}

function checkAll(elems) {
    return elems.every((elem) => Number.isInteger(elem))
}

function greatCommonDivisor(a, b) {
    return (!b ? a : greatCommonDivisor(b, a % b))
}

function leastCommonMultiple(a, b) {
    return (a * b) / greatCommonDivisor(a, b)
}

function leastCommonMultipleArr(...arr) {
    return [...arr].reduce((a, b) => leastCommonMultiple(a, b));
}
