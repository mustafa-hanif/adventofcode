var fs = require('fs');

const file = fs.readFileSync('input.txt', 'utf8');
let lines = file.split('\n');
let count = 0;

for (let i = 0; i < lines.length - 2; i++) {
  const window1 = parseInt(lines[i], 10) + parseInt(lines[i + 1], 10) + parseInt(lines[i + 2], 10);

  const window2 = parseInt(lines[i + 1], 10) + parseInt(lines[i + 2], 10) + parseInt(lines[i + 3], 10);
  
  if (window2 > window1) {
    count += 1;
    // console.log({ prevLine, line, count });
  } else {
    // console.log({ prevLine, line, count });
  }
}
console.log(count);
