var fs = require('fs');

const file = fs.readFileSync('1.txt', 'utf8');
let lines = file.split('\n');
let count = 0;

let sum = 0
for (let i = 0; i < lines.length; i++) {
  const matches = lines[i].match(/[\d]|one|two|three|four|five|six|seven|eight|nine/g);
  console.log(matches);
  // const n = Number(matches[0] + matches[matches.length - 1]);
  // console.log(n);
  // sum += n;
}
// console.log(sum);
