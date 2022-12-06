var fs = require('fs');

const file = fs.readFileSync('input2022-6.txt', 'utf8').trimEnd();
let lines = file.split('\n');

// part 1
// const limit = 3;
// part 2
const limit = 14;

for (let i = 0; i < lines.length; i++) {
  const chars = lines[i].split('');
  for (let j = 0; j < chars.length - limit; j++) {
    const set = new Set();
    for (let k = j; k < j + limit; k++) {
      set.add(chars[k]);
    }
    
    if (set.size === limit) {
      console.log(j+limit);
      break;
    }
  }
}
// print the first item in each column




