var fs = require('fs');

const file = fs.readFileSync('input2.txt', 'utf8');
let lines = file.split('\n');
lines = lines.map(a => a.replace(/\n\r/g, ''));
let horizontal = 0;
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const instruction = lines[i].split(' ');
  const [operation, argument] = instruction;
  const arg = parseInt(argument, 10);
  console.log({ instruction, operation, argument, arg, horizontal, depth });
  if (operation === 'forward') {
    horizontal += arg;
  }
  if (operation === 'down') {
    depth += arg;
  }
  if (operation === 'up') {
    depth -= arg;
  }
}
console.log(horizontal*depth);
