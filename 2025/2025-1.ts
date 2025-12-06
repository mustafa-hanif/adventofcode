var fs = require('fs');

const file = fs.readFileSync('input.txt', 'utf8');
let lines = file.split('\n');
let count1 = 0;
let sum = 50;

for (let i = 0; i < lines.length - 1; i++) {
  const dir = lines[i].slice(0, 1);
  const count = Number(lines[i].slice(1));
  // console.log('start', dir, count);
  if (dir === 'L') {
    for (let ii = 0; ii < count; ii++) {
      // console.log(ii);
      sum -= 1;
      if (Math.abs(sum % 100) === 0) {
        // console.log(dir, count);
        count1 += 1;
      }
    }
  } else if (dir === 'R') {
    for (let ii = 0; ii < count; ii++) {
      sum += 1;
      if (Math.abs(sum % 100) === 0) {
        // console.log(dir, count);
        count1 += 1;
      }
    }
  }
  //console.log('sum', sum);
}
console.log(count1);
