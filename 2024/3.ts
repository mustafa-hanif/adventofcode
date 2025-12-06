var fs = require('fs');

const file = fs.readFileSync('3.txt', 'utf8');
let lines = file.split('\n');


const input: string = lines.join('');

const str = 'mul(X,Y)';
let index = 0;

let intCount = 0;
let intStringA = '';
let intStringB = '';
let sum = 0;

function myMatch(index: number, myInput: string, char: string) {
  if (myInput.match(/[\d]/g) && (char === 'X' || char === 'Y')) {
    if (Number.isInteger(parseInt(myInput))) {
      intCount++;
      if (char === 'X') {
        intStringA += myInput;
      }
      if (char === 'Y') {
        intStringB += myInput;
      }
      if (intCount > 3) {
        return 0;
      }
      return index;
    }
  } else if ((myInput === ',' && char === 'X') || (myInput === ')' && char === 'Y')) {
    // means i was counting a number
    if (intCount > 0) {
      intCount = 0;
      return index + 2;
    }
    return 0;
  } else if (char === myInput) {
    intCount = 0;
    return index + 1;
  }
  intCount = 0;
  intStringA = '';
  intStringB = '';
  return 0;
}

// console.log(input.match(/mul\(([\d]+),([\d]+)\)/g))
var r = new RegExp(/mul\(([\d]+),([\d]+)\)/g);
for (const match of input.matchAll(r)) {
  console.log(match[1], match[2]);
  sum += (Number(match[1]) * Number(match[2]));
}
for (let i = 0; i < input.length; i++) {
  // console.log(index, input[i], str[index % 8], intCount);
  // index = myMatch(index, input[i], str[index % 8]);
  // console.log(index, intCount, intStringA, intStringB);
  // console.log('---');
  // if (index % 8 === 0) {
  //   console.log(intStringA, intStringB);
  //   sum += (Number(intStringA) * Number(intStringB));
  //   intStringA = '';
  //   intStringB = '';
  // }
}
console.log(sum);