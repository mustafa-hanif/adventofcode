var fs = require('fs');
const file = fs.readFileSync('input2022-10.txt', 'utf8').trimEnd();
let lines = file.split('\n');

let i = 0;
let cycle = 0;
let x = 2;

let total = 0;
let string = '';

let string2 = '';
const doSomething = (cycle, x) => {
  for (let i = 0; i < 40; i++) {
    if (i === x - 1 || i === x || i === x + 1) {
      string += '#';
    } else {
      string += '.'
    }
  }
  // console.log("Sprite position: ", string, x);
  string = '';

  let cycle2 = cycle % 40;
  if (cycle2 === x - 1 || cycle2 === x || cycle2 === x + 1) {
    string2 += '#';
  } else {
    string2 += '.'
  }

  // console.log("row            : ", string2);
  // console.log("cycle", cycle2);
  
  if (cycle % 40 === 0) {
    console.log(string2);
    string2 = '';
  }
}

while (i < lines.length) {
  let line = lines[i];
  if (line.trim() === 'noop') {
    i++;
    cycle++;
    doSomething(cycle, x);
    // do-something
    continue;
  }
  if (line.split(' ')[0] === 'addx') {
    const num = parseInt(line.split(' ')[1], 10);
    cycle++;
    // do-something
    doSomething(cycle, x);

    
    cycle++;
    // do-something
    doSomething(cycle, x);
    x += num;
    i++;
  }
}

console.log(total)