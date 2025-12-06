var fs = require('fs');

const file = fs.readFileSync('2024/2.txt', 'utf8');
let lines = file.split('\n');
let count = 0;
let level: number[] = []

function checkSafe(level) {
  let safe = true;
  let inc = false;
  let dec = false;

  let fix = -1;
  for (let j = 0; j < level.length - 1; j++) {
    let a = level[j];
    let b = level[j + 1];
    if (fix > -1 && fix === j) {
      a = level[j - 1];
    } else if (fix && fix === j + 1) {
      b = level[j + 2];
    }
    if (j > 0) {
      if (inc && a > b) {
        safe = false;
        break;
      } else if (dec && b > a) {
        safe = false;
        break;
      }
    }

    if (Math.abs(a - b) > 3) {
      safe = false;
      break;
    }

    if (a === b) {
      safe = false;
      break;
    }

    if (b > a) {
      inc = true;
    } else if (a > b) {
      dec = true;
    }
  }
  return [safe, fix];
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  level = [...line.split(' ')].map(Number);
  
  let [safe, fix] = checkSafe(level);
  if (!safe) {
    for (let j = 0; j < level.length; j++) {
      [safe, fix] = checkSafe(level.filter((a, k) => k !== j));
      if (safe) {
        break;
      }
    }
  }
  if (safe) {
    console.log('safe', level.map((a, i) => i === fix ? `(${a})` : a).join(' '));
    count++;
  } else {
    console.log('unsafe', level.map((a, i) => i === fix ? `(${a})` : a).join(' '));
  }
}

console.log('answer', count);

