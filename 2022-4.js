var fs = require('fs');

const file = fs.readFileSync('input2022-4.txt', 'utf8');
let lines = file.split('\n');

let count = 0;
let dd = 0;
for (let i = 0; i < lines.length; i++) {
  const r1l = lines[i].split(',')[0].split('-')[0];
  const r1h = lines[i].split(',')[0].split('-')[1];

  const r2l = lines[i].split(',')[1].split('-')[0];
  const r2h = lines[i].split(',')[1].split('-')[1];
  
  if (r1l >= r2l && r1h <= r2h || r2l >= r1l && r2h <= r1h) {
    console.log('overlap', r1l, r1h, r2l, r2h);
    count++;
  } else {
    console.log('no overlap', r1l, r1h, r2l, r2h);
    dd++;
  }
}

console.log(count, dd);


