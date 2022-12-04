var fs = require('fs');

const file = fs.readFileSync('input2022-4.txt', 'utf8').trimEnd();
let lines = file.split('\n');

let count = 0;
let dd = 0;
for (let i = 0; i < lines.length; i++) {
  const r1l = parseInt(lines[i].split(',')[0].split('-')[0], 10);
  const r1h = parseInt(lines[i].split(',')[0].split('-')[1], 10);

  const r2l = parseInt(lines[i].split(',')[1].split('-')[0], 10);
  const r2h = parseInt(lines[i].split(',')[1].split('-')[1], 10);
  
  // part 1
  // if ((r1l >= r2l && r1h <= r2h) || (r2l >= r1l && r2h <= r1h)) {
  //   count++;
  // } else {
  //   dd++;
  // }

  // part 2
  if ((r1l >= r2l && r1l <= r2h) || (r2l >= r1l && r2l <= r1h)) {
    count++;
  }
}

console.log(count);


