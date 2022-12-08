var fs = require('fs');

const file = fs.readFileSync('input2022-8.txt', 'utf8').trimEnd();
let lines = file.split('\n');

const height = lines.length;
const width = lines[0].split('').length;

const getItemAt = (y, x) => {
  return parseInt(lines[y].split('')[x], 10);
}

let invisible = 0;
let totaltrees = 0;
let besttree = 0;
for (let i = 0; i < lines.length; i++) {
  const chars = lines[i].split('');
  for (let j = 0; j < chars.length; j++) {
    const item = parseInt(chars[j], 10);
    // console.log(i, j);
    let south = 0;
    let north = 0;
    let right = 0;
    let left = 0;

    // check in south direction
    for (let k = i + 1; k < height; k++) {
      const n = getItemAt(k, j);
      south++;
      if (n >= item) {
        break;
      }
    }
    // check in right direction
    for (let k = j + 1; k < width; k++) {
      const n = getItemAt(i, k);
      right++;
      if (n >= item) {
        break;
      }
    }
    // check in north direction
    for (let k = i - 1; k >= 0; k--) {
      const n = getItemAt(k, j);
      north++;
      if (n >= item) {
        break;
      }
    }
    // check in left direction
    for (let k = j - 1; k >= 0; k--) {
      const n = getItemAt(i, k);
      left++;
      if (n >= item) {
        break;
      }
    }
    // part 2
    besttree = Math.max(besttree, south * north * right * left);

    // part 1
    // if (south && north && right && left) {
    //   invisible++;
    // }
    // totaltrees++
  }
}

// console.log(totaltrees - invisible);
console.log(besttree);
