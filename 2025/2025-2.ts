import { LlamaTokenizer } from "@xenova/transformers";

var fs = require('fs');

const line = fs.readFileSync('input2.txt', 'utf8');

const ranges = line.split(',');

type Digit = {
  order: number[];
  value: number;
};

function invalidCheck(n) {
  const _string = n.toString();
  for (let i = 1; i < _string.length; i++) {
    const subStr = _string.slice(0, i);
    const matches = _string.match(new RegExp(subStr, 'g'));
    const final = _string.replace(new RegExp(subStr, 'g'), '');
    // console.log(matches.length, final);
    if (matches.length > 1 && final === '') {
      return true;
    }
  }
  return false;
}

// console.log(invalidCheck(1188511885));

let sum = 0;
for (let range of ranges) {
  const from = Number(range.split('-')[0]);
  const to = Number(range.split('-')[1]);
  // console.log({ from, to })
  for (let i = from; i <= to; i++) {
    if (invalidCheck(i)) {
      sum += i;
    }
  }
}


console.log(sum);