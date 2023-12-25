var fs = require('fs');

const file = fs.readFileSync('3.txt', 'utf8');
let lines = file.split('\n');
let count = 0;

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].split('');
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char.match(/[0-9]/)) {
      console.log(char);
    }
    
  }
}
// console.log(sum);
