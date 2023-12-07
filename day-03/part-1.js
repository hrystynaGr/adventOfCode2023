const fs = require('fs');
let pattern = /[0-9]+/;

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
    const arrayOfArrays = fromStringToArray(finishedGames);
    global.rowLength = arrayOfArrays[0].length
    global.columnLength = arrayOfArrays.length
    const arrayOfNumbersWeNeed = findNumbers(arrayOfArrays);
    const arrayWithJoinedNums = joinSubArrays(arrayOfNumbersWeNeed);
    const arrayWithJoinedTrue = transformElemntOfArrsToNums(arrayWithJoinedNums);
    const sum = sumUpAllElemsOfArray(arrayWithJoinedTrue);
    console.log(sum);
    // console.log(arrayOfNumbersWeNeed);
});

function fromStringToArray(string) {
    return string.split('\n').map((arr) => arr.split(''))
}

function findNumbers(arr) {
    let res = [];
    arr.map((row, rowIndex) => {
        row.map((cell, columnIndex) => {
            if (!cell.match(pattern) && cell != '.') {
                //check if there is number to the right
                let r = checkNumsRight(arr, row, rowIndex, cell, columnIndex)
                res.push(r)
                //check if there is number to the left
                let l = checkNumsLeft(arr, row, rowIndex, cell, columnIndex)
                res.push(l)
                // check if there is number on top
                // right ontop of sumbol
                if ((rowIndex - 1) >= 0) {
                    if (arr[rowIndex - 1][columnIndex].match(pattern)) {
                        let t = checkNumsTop(arr, arr[rowIndex - 1], rowIndex - 1, cell, columnIndex)
                        res.push(t)
                    }
                    else if (arr[rowIndex - 1][columnIndex + 1].match(pattern) || arr[rowIndex - 1][columnIndex - 1].match(pattern)) {
                        if ((columnIndex + 1) < global.rowLength && arr[rowIndex - 1][columnIndex + 1].match(pattern)) {
                            let t = checkNumsTop(arr, arr[rowIndex - 1], rowIndex - 1, cell, columnIndex + 1)
                            res.push(t)
                        }
                        //diagonally left
                        if ((columnIndex - 1) >= 0 && arr[rowIndex - 1][columnIndex - 1].match(pattern)) {
                            let t = checkNumsTop(arr, arr[rowIndex - 1], rowIndex - 1, cell, columnIndex - 1)
                            res.push(t)
                        }
                    }
                    //diagonally right

                }
                //check if there is number on bottom
                // right below of symbol
                // console.log('arr[rowIndex]', arr[rowIndex], rowIndex, arr.length, arr)
                if ((rowIndex + 1) < global.columnLength) {
                    // console.log(arr[rowIndex + 1], rowIndex + 1)
                    if (arr[rowIndex + 1][columnIndex].match(pattern)) {
                        let t = checkNumsTop(arr, arr[rowIndex + 1], rowIndex + 1, cell, columnIndex)
                        res.push(t)
                    }
                    //diagonally right
                    else if (arr[rowIndex + 1][columnIndex + 1].match(pattern) || arr[rowIndex + 1][columnIndex - 1].match(pattern)) {
                        if ((columnIndex + 1) < global.rowLength && arr[rowIndex + 1][columnIndex + 1].match(pattern)) {
                            let t = checkNumsTop(arr, arr[rowIndex + 1], rowIndex + 1, cell, columnIndex + 1)
                            res.push(t)
                        }

                        //diagonally left
                        if ((columnIndex - 1) >= 0 && arr[rowIndex + 1][columnIndex - 1].match(pattern)) {
                            let t = checkNumsTop(arr, arr[rowIndex + 1], rowIndex + 1, cell, columnIndex - 1)
                            res.push(t)
                        }
                    }
                }
               
            }
        })
    })
    return res;
}

function checkNumsRight(arr, row, rowIndex, cell, columnIndex) {
    let rightNum = [];
    let n = 1;
    while (columnIndex + n !== row.length && arr[rowIndex][columnIndex + n].match(pattern)) {
        rightNum.push(arr[rowIndex][columnIndex + n])
        arr[rowIndex][columnIndex + n] = '.'
        n++;
    }
    return rightNum
}

function checkNumsLeft(arr, row, rowIndex, cell, columnIndex) {
    let leftNum = [];
    let l = 1;
    while (columnIndex - l !== -1 && arr[rowIndex][columnIndex - l].match(pattern)) {
        leftNum.unshift(arr[rowIndex][columnIndex - l])
        arr[rowIndex][columnIndex - l] = '.'
        l++;
    }
    return leftNum;
}

function checkNumsTop(arr, row, rowIndex, cell, columnIndex) {
    let topNum = [];
    topNum.push(row[columnIndex]);
    row[columnIndex] = '.'
    let right = checkNumsRight(arr, row, rowIndex, cell, columnIndex);
    let left = checkNumsLeft(arr, row, rowIndex, cell, columnIndex);
    topNum = left.concat(topNum);
    topNum = topNum.concat(right);
    return topNum;
}

function joinSubArrays(arr) {
    return arr.map(el => el.join(''))
}

function transformElemntOfArrsToNums(arr) {
    return arr.map((el) => +el)
}

function sumUpAllElemsOfArray(arr) {
    return arr.reduce((el, acc) => el + acc)
}