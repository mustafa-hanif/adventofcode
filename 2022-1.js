var fs = require('fs');

const file = fs.readFileSync('input.txt', 'utf8');
let lines = file.split('\n');

let count = 0;
let maxCount = [0, 0, 0];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].split('').length > 0) {
    const line = parseInt(lines[i], 10);
    count += line;
  } else {
    for (let j = 0; j < maxCount.length; j++) {
      if (count > maxCount[j]) {
        maxCount[j] = count;
        break;
      }
    }
    count = 0;
    maxCount.sort((a, b) => a - b);
    console.log(maxCount)
  }
}

// part 1
console.log(maxCount[maxCount.length - 1]);

// part 2
console.log(maxCount.reduce((a, b) => a + b, 0));
