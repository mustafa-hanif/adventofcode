var fs = require('fs');

const file = fs.readFileSync('input23.txt', 'utf8');
let lines = file.split('\n');
lines = lines.map(a => a.replace(/\n\r/g, ''));

var rooms = new Array(lines.length - 2);
for (let i = 2; i < lines.length; i++) {
  let chars = lines[i].split('');
  // loop over chars
  // rooms.push([]);
  const row = lines.length - i - 2;
  rooms[row] = new Array();
  for (let j = 0; j < chars.length; j++) {
    const col = Math.floor(j/2);
    // if char is A or B or C or D
    if (chars[j] === 'A' || chars[j] === 'B' || chars[j] === 'C' || chars[j] === 'D') {
      // rooms[i-2].push(chars[j]);
      rooms[row].push(chars[j]);
    }
  }
}
rooms = rooms.slice(0, rooms.length - 1).reverse();

const home = {
  A: 0,
  B: 1,
  C: 2,
  D: 3
}
console.log(rooms[0]);
console.log(rooms[1]);

let highwaySushi = [];
// loop over rooms
for (let i = 0; i < rooms.length; i++) {
  for (let j = 0; j < rooms[i].length; j++) {
    var sushi = rooms[i][j];

    // get row difference between sushi and its home
    const rowDiff = home[sushi] - j;
    

    const colDiff = sushi === rooms[1][home[sushi]] ? 0 : 1;
    console.log(sushi, rowDiff, colDiff);
    if (rowDiff === 0 && colDiff === 0) {
      continue;
    }
    let sushiBlockingMyWay = [];
    sushiBlockingMyWay = [...highwaySushi];

    if (rowDiff !== 0) {
      sushiBlockingMyWay.push(rooms[0][home[sushi]]);
    }
    
    if (colDiff === 1) {
      sushiBlockingMyWay.push(rooms[1][home[sushi]]);
    }

    if (i === 1) {
      sushiBlockingMyWay.push(rooms[0][j]);
    }
    console.log(sushiBlockingMyWay);

    let costOfReachingHome = 0;
    console.log(rowDiff);
    
    /*
    C 1 0
    [ 'B' ]
    */
  }
}