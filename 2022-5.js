var fs = require('fs');

const file = fs.readFileSync('input2022-5.txt', 'utf8').trimEnd();
let lines = file.split('\n');

const myitems = [];
let cols = [];
for (let i = 0; i < lines.length; i++) {
  // the line which indexes the columns
  const numberLine = lines[i].match(/(\d+)/g);

  // if its a line with items
  if (lines[i].split('').findIndex((x) => x === '[') > -1) {
    const items = lines[i].matchAll(/\[/g)
    for (const item of items) {
      // record the item and the column it appeared in
      myitems.push({
        char: lines[i].split('')[item.index + 1],
        col: (item.index / 4) + 1,
      });
    }
  } else if (lines[i].split('move').length === 2) {
    const match = lines[i].match(/move (\d+) from (\d+) to (\d+)/);
    const count = parseInt(match[1], 10);
    const from = parseInt(match[2], 10);
    const to = parseInt(match[3], 10);

    // part 1
    // for (let i = 0; i < count; i++) {
    //   cols[to].push(cols[from].pop());
    // }

    // part 2
    cols[to] = cols[to].concat(cols[from].slice(-count));
    cols[from] = cols[from].slice(0, cols[from].length - count)

  } else if (numberLine?.length > 0) {
    // once I am on the index line, I can start to build the columns
    // 2d array of columns
    cols = new Array(+numberLine[numberLine.length - 1] + 1);
    [...myitems.reverse()].forEach(item => {
      if (cols[item.col] === undefined) {
        cols[item.col] = [];
      }
      cols[item.col].push(item.char);
    });
  }
}
// print the first item in each column
console.log(cols.map(col => col[col.length-1]).join(''));



