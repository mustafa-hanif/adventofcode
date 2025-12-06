var fs = require('fs');

const file = fs.readFileSync('input.txt', 'utf8');
let lines = file.split('\n');
let count = 0;

const arr1: number[] = []
const arr2: number[] = []
for (let i = 0; i < lines.length; i++) {
  const [a, b] = lines[i].split('   ');
  arr1.push(Number(a))
  arr2.push(Number(b))
}
arr1.sort();
arr2.sort();

let sum: number = 0
// for (let i = 0; i < arr1.length; i++) {
//   sum += Math.abs(arr2[i] - arr1[i]);
// }

// console.log(sum);


for (let i = 0; i < arr1.length; i++) {
  // count arr1[i]
  let count = 0;
  for (let j = 0; j < arr2.length; j++) {
    if (arr2[j] === arr1[i]) {
      count++;
    }
    if (arr2[j] > arr1[i]) {
      break;
    }
  }
  sum += arr1[i] * count;
}

console.log(sum);