var fs = require('fs');

const file = fs.readFileSync('input2022-3.txt', 'utf8');
let lines = file.split('\n');

let sum = 0;

// convert char to int
const c = (item) => {
  const char = item.charCodeAt(0);
  if (char >= 65 && char <= 90) {
    return char - 65 + 27;
  } else if (char >= 97 && char <= 122) {
    return char - 71 - 25;
  }
}

const part1 = (sum, items) => {
  for (let j = 0; j < items.length; j++) {
    if (j < items.length / 2) {
      // just count items in the first half, where index is item, and value is count
      countArr[c(items[j])]++;
    } else {
      const value = c(items[j]);
      if (countArr[value] > 0) {
        sum += value;
        // if found remove from count, so we don't count it again
        countArr[value] = 0;
      }
    }
  }
  countArr = new Array(28*2).fill(0);
  return sum;
}

const part2 = (sum, items, i, countArr) => {
  for (let j = 0; j < items.length; j++) {
    const value = c(items[j]);
    // first line of group, just count all items
    if (i % 3 === 0) {
      countArr[value]++;
    } 
    // second line of group, mark items that were found in first line with -1
    else if (i % 3 === 1) {
      if (countArr[value] > 0) {
        countArr[value] = -1;
      }
    }
    // if we found item that was common in first both lines, mark it with -2 
    else {
      if (countArr[value] === -1) {
        countArr[value] = -2;
      }
    }
  }

  // if we are at the end of group, count all items that were found in all 3 lines
  if (i % 3 === 2) {
    for (let j = 0; j < countArr.length; j++) {
      if (countArr[j] === -2) {
        sum += j;
      }
      countArr[j] = 0;
    }
  }

  return sum;
}

let countArr = new Array(28*2).fill(0);
for (let i = 0; i < lines.length; i++) {
  const items  = lines[i].split('');
  sum = part1(sum, items, countArr);
  // sum = part2(sum, items, i, countArr);
}
console.log(sum)