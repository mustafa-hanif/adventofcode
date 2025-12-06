var fs = require('fs');

const line5 = fs.readFileSync('input5.txt', 'utf8');

const group = line5.split('\n\n');

const ranges = group[0].split('\n');
const inputs = group[1].split('\n');

const _array = [];

let min = Infinity;
let max = 0;

const _myArray: number[] = [];
for (let range of ranges) {
  const from = Number(range.split("-")[0]);
  const to = Number(range.split("-")[1]);
  
  _array.push({
    from, to
  })
}

let count = 0;
let minus = 0;

for (let a of _array) {
  // if a.from is in range of any other and a.to is greater than that range.to, then we can increase the a.from to that range.to + 1
  for (let b of _array) {
    if (a !== b) {
      if (a.from >= b.from && a.from <= b.to && a.to > b.to) {
        a.from = b.to + 1;
      }

      // if a.to is in range of any other and a.from is less than that range.from, then we can decrease the a.to to that range.from - 1
      if (a.to >= b.from && a.to <= b.to && a.from < b.from) {
        a.to = b.from - 1;
      }

      // if a.from and a.to are both in range of any other, then we can mark this range as invalid
      if (a.from >= b.from && a.to <= b.to) {
        a.from = 1;
        a.to = 0;
      }
    }
  }
}

console.log(_array);

// for (let input of inputs) {
//   const num = Number(input);
//   let valid = false;
//   for (let range of _array) {
//     if (num >= range.from && num <= range.to) {
//       valid = true;
//       break;
//     }
//   }
//   if (valid) {
//     count += 1;
//   }
// }


for (let range of _array) {
  count += (range.to - range.from + 1);
}
console.log(count);