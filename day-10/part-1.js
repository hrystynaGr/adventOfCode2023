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

readFile('./input-1.txt', (finishedGames) => {
    const startValues = processInputData(finishedGames);
    const position = positionOfS(startValues);
    const trav = findSConnections(startValues, position);
    const stepsCount = findConnection(startValues, trav[0][0], [trav[0][1], trav[0][2]], 0);
    console.log(stepsCount);
});

function processInputData(string) {
    return string.split('\n').map((el) => el.split(''));
}

const connections = {
    '|': { 'up': ['7', '|', 'F'], 'down': ['|', 'L', 'J'], 'left': [], 'right': [] },
    '-': { 'up': [], 'down': [], 'left': ['L', 'F', '-'], 'right': ['J', '7', '-'] },
    '7': { 'up': [], 'down': ['|', 'L', 'J'], 'left': ['F', '-', 'L'], 'right': [] },
    'J': { 'up': ['|', 'F', '7'], 'down': [], 'left': ['F', 'L', '-'], 'right': [] },
    'L': { 'up': ['|', 'F', '7'], 'down': [], 'left': [], 'right': ['J', '7', '-'] },
    'F': { 'up': [], 'down': ['|', 'L', 'J'], 'left': [], 'right': ['J', '7', '-'] },
}

function positionOfS(graph) {
    let i = 0;
    let j = 0;
    while (i < graph.length) {
        while (j < graph[i].length) {
            if (graph[i][j] === 'S') {
                return [i, j];
            }
            j++;
        }
        j = 0;
        i++;
    }
}
function findSConnections(graph, positionS) {
    let [i, j] = positionS;
    const res = [];
    if (['F', '7', '|'].includes(graph[i - 1][j])) {
        res.push([graph[i - 1][j], i - 1, j]);
    }
    if (['J', '7', '-'].includes(graph[i][j + 1])) {
        res.push([graph[i][j + 1], i, j + 1]);
    }
    if (['|', 'L', 'J'].includes(graph[i + 1][j])) {
        res.push([graph[i + 1][j], i + 1, j]);
    }
    if (['F', 'L', '-'].includes(graph[i][j - 1])) {
        res.push([graph[i][j - 1], i, j - 1]);
    }
    return res;
}

function findConnection(graph, elem, positionS, count) {
    let [i, j] = positionS;
    let placeholder = '';
    graph[i][j] = '!';
    while (1 == 1) {
        if (i + 1 <= graph.length && connections[elem]['down'].length && connections[elem]['down']?.includes(graph[i + 1][j])) {
            placeholder = graph[i + 1][j];
            graph[i + 1][j] = '!';
            i = i + 1;
        }
        else if (i - 1 >= 0 && connections[elem]['up'].length && connections[elem]['up']?.includes(graph[i - 1][j])) {
            placeholder = graph[i - 1][j]
            graph[i - 1][j] = '!';
            i = i - 1;
        }
        else if (j - 1 >= 0 && connections[elem]['left'].length && connections[elem]['left']?.includes(graph[i][j - 1])) {
            placeholder = graph[i][j - 1]
            graph[i][j - 1] = '!';
            j = j - 1;
        }
        else if (j + 1 <= graph[i].length && connections[elem]['right'].length && connections[elem]['right']?.includes(graph[i][j + 1])) {
            placeholder = graph[i][j + 1]
            graph[i][j + 1] = '!';
            j = j + 1
        }
        else if (graph[i][j + 1] == 'S' || graph[i][j - 1] == 'S' || graph[i + 1][j] == 'S' || graph[i - 1][j] == 'S') {
            console.log(Math.trunc(count / 2) + 1)
            break;
        }
        count += 1;
        elem = placeholder;
    }

}