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
    const stepsCount = findConnection(startValues, 'S', [position[0], position[1]], 0);
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
    'S': { 'up': ['|', 'F', '7'], 'down': ['|', 'L', 'J'], 'left': ['L', 'F', '-'], 'right': ['J', '7', '-'] }
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

function findConnection(graph, elem, positionS, count) {
    let [i, j] = positionS;
    let placeholder = '';
    const numRows = graph.length;
    const numColumns = graph[i].length;
    let elemConections = [];
    while (true) {
        let nextPos = [];
        elemConections = connections[elem]
        if (i + 1 < numRows && canConnect('down', elem, graph[i + 1][j])) {
            nextPos = [i + 1, j];
        }
        else if (i - 1 >= 0 && canConnect('up', elem, graph[i - 1][j])) {
            nextPos = [i - 1, j];
        }
        else if (j - 1 >= 0 && canConnect('left', elem, graph[i][j - 1])) {
            nextPos = [i, j - 1];
        }
        else if (j + 1 < numColumns && canConnect('right', elem, graph[i][j + 1])) {
            nextPos = [i, j + 1];
        }
        else if (isSNear(graph, [i, j])) {
            return Math.trunc(count / 2) + 1;
            break;
        }
        if (nextPos) {
            const [nextI, nextJ] = nextPos;
            placeholder = graph[nextI][nextJ];
            graph[nextI][nextJ] = '!';
            i = nextI;
            j = nextJ;
        }
        count += 1;
        elem = placeholder;
    }

}

function canConnect(direction, element, nextElement) {
    return connections[element][direction].length &&
        connections[element][direction].includes(nextElement);
}

function isSNear(graph, coordinates) {
    let [i, j] = coordinates;
    return graph[i][j + 1] == 'S' ||
        graph[i][j - 1] == 'S' ||
        graph[i + 1][j] == 'S' ||
        graph[i - 1][j] == 'S'
}