var fs = require('fs');
const file = fs.readFileSync('input2022-10.txt', 'utf8').trimEnd();
let lines = file.split('\n');

let i = 0;
let cycle = 0;
let x = 2;

let total = 0;

let string2 = '';
const doSomething = (cycle, x) => {
  // part 2
  let cycle2 = cycle % 40;
  if (cycle2 === x - 1 || cycle2 === x || cycle2 === x + 1) {
    string2 += '#';
  } else {
    string2 += '.'
  }
  
  if (cycle2 === 0) {
    console.log(string2);
    string2 = '';
  }

  // part 1
  if (cycle % 40 === 20) {
    total += cycle * x;
  }
}

while (i < lines.length) {
  let line = lines[i];
  if (line.trim() === 'noop') {
    cycle++;
    doSomething(cycle, x);
    continue;
  }
  if (line.split(' ')[0] === 'addx') {
    const num = parseInt(line.split(' ')[1], 10);
    cycle++;
    doSomething(cycle, x);
    
    cycle++;
    doSomething(cycle, x);
    x += num;
  }
  i++;
}

console.log(total)