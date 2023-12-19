// Working too slow
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

// readFile('./input-2.txt', (finishedGames) => {
//     processInputData(finishedGames);
// });

// function processInputData(string) {
//     const arrays = formatInput(string);
//     const seeds = extractSeeds(arrays);
//     // const seedsList = createSeedsList(seeds);
//     const mapSoil = extractMap(arrays);
//     const maps = listOfSeeds(seeds, mapSoil)
//     const res = findMin(maps);
//     // console.log('seedsList', seedsList);
//     console.log('seedsList', maps, res);
// }



// function formatInput(string) {
//     return string.split('\n')
// }

// function extractMap(arr) {
//     return arr.reduce((result, el) => {
//         if (el) {
//             const values = el.split(' ').map(Number);
//             if (!isNaN(values[0])) {
//                 result[result.length - 1].push(values);
//             }
//         } else {
//             result.push([]);
//         }
//         return result;
//     }, []).filter(subArr => subArr.length > 0);
// }


// function extractSeeds(arr) {
//     return arr[0]
//         .split(': ')[1]
//         .split(' ')
//         .map(el => +el);
// }

// // function createSeedsList(arr) {
// //     let res = [];
// //     arr.forEach((el, index) => {
// //         if (index % 2 === 0) {
// //             let n = 0;
// //             while (arr[index + 1] != n) {
// //                 res.push(el + n);
// //                 n++;
// //             }
// //         }
// //     })
// //     return res;
// // }

// function findMin(locations) {
//     return Math.min(...locations)
// }

// function listOfSeeds(seeds, maps) {
//     let res = [];
//     seeds.forEach((seed, index) => {
//         if (index % 2 === 0) {
//             let n = 0;
//             while (n <= seeds[index + 1]) {
//                 res.push(applyMap(seed + n, maps))
//                 n++;
//             }
//         }
//     })
//     return res;
// }

// function applyMap(seed, maps) {
//     return maps.reduce(((a, b) => {
//         return onFindOfElements(a, b)
//     }), seed)
// }

// function transformElemToAnother(element, map) {
//     // console.log('insidemap', map)
//     if (element <= map[1] + map[2] - 1 && element >= map[1]) {
//         return (element - map[1]) + map[0];
//     }
//     else {
//         return element
//     }
// }

// function onFindOfElements(element, mapsList) {
//     let res = mapsList.map((map => transformElemToAnother(element, map))).filter((el) => el != element)
//     if (!res.length) {
//         return element
//     }
//     else {
//         return res[0]
//     }
// }

