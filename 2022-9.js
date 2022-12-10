var fs = require('fs');
var term = require( 'terminal-kit' ).terminal ;


const file = fs.readFileSync('input2022-9.txt', 'utf8').trimEnd();
let lines = file.split('\n');

// Y, X
let snake = new Array(10).fill(0).map(() => [0, 0]);

let visited = [[0,0]];
let moves = 1;

const DIR = {
  R: {x: 1, y: 0},
  L: {x: -1, y: 0},
  U: {x: 0, y: -1},
  D: {x: 0, y: 1},
}

const fn = (dir, distance, moves) => {
  for (let i = 1; i <= distance; i++) {
    let curposition = snake[0];
    snake[0] = [curposition[0] + DIR[dir].y, curposition[1] + DIR[dir].x];
    for (let j = 1; j < snake.length; j++) {
      let scurposition = snake[j-1];
      let lastpos = snake[j];
      const delta = Math.max(Math.abs(scurposition[0] - lastpos[0]), Math.abs(scurposition[1] - lastpos[1]));
      
      console.log('delta', delta, j, scurposition, lastpos);
      console.log(Math.abs(scurposition[0] - lastpos[0]), Math.abs(scurposition[1] - lastpos[1]));
      // terminal.write(j, lastpos[1]+20, lastpos[0]+20);
      if (delta === 2) {
        let dirToGoH = null;
        let dirToGoV = null;
        if (scurposition[0] - lastpos[0] === 2) {
          dirToGoV = 'D';
        }
        if (scurposition[0] - lastpos[0] === -2) {
          dirToGoV = 'U';
        }
        if (scurposition[1] - lastpos[1] === 2) {
          dirToGoH = 'R';
        }
        if (scurposition[1] - lastpos[1] === -2) {
          dirToGoH = 'L';
        }
        //console.log('delta2', delta, j, scurposition, lastpos);
        if (dirToGoH && dirToGoV) {
          snake[j] = [scurposition[0] - DIR[dirToGoV].y, scurposition[1] - DIR[dirToGoH].x];
        } else if (dirToGoH) {
          snake[j] = [scurposition[0] - DIR[dirToGoH].y, scurposition[1] - DIR[dirToGoH].x];
        } else {
          snake[j] = [scurposition[0] - DIR[dirToGoV].y, scurposition[1] - DIR[dirToGoV].x];
        }
        
        lastpos = snake[j];
        if (j === snake.length - 1) {
          if (visited.filter(v => v[0] === lastpos[0] && v[1] === lastpos[1]).length === 0) {
            // console.log('last snake', j, delta, lastpos);
            // console.log('assigning', [lastpos[0] + DIR[dir].y, lastpos[1] + DIR[dir].x])
            visited.push(lastpos);
            moves++;
            // console.log('add move', moves, lastpos);
          }
        }
      }
    }
    // loop over snake
    for (let j = 0; j < snake.length; j++) {
      console.log(snake[j]);
    }
    console.log(dir, '---');
  }
  return moves;
}

for (let i = 0; i < lines.length; i++) {
  const dir = lines[i].split(' ')[0];
  const distance = parseInt(lines[i].split(' ')[1], 10);
  // console.log(dir, distance);
  moves = fn(dir, distance, moves);
}

console.log(moves);

