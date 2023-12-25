var fs = require('fs');

const file = fs.readFileSync('1.txt', 'utf8');
let lines = file.split('\n');
let count = 0;

let sum = 0
const _map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

for (let i = 0; i < lines.length; i++) {
  const matches = lines[i].match(/[\d]|one|two|three|four|five|six|seven|eight|nine/gm);
  console.log(matches);
  const n1 = matches[0].length === 1 ? Number(matches[0]) : _map[matches[0]];
  const n2 = matches[matches.length-1].length === 1 ? Number(matches[matches.length-1]) : _map[matches[matches.length-1]];
  // console.log(n1, n2);
  const n = Number(`${n1}${n2}`);
  console.log(n);
  // sum += n;
}
// console.log(sum);
