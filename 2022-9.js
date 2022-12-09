var fs = require('fs');

const file = fs.readFileSync('input2022-9.txt', 'utf8').trimEnd();
let lines = file.split('\n');

// Y, X
let lastpos = [0, 0];
let curposition = [0, 0];
let visited = [[0,0]];
let moves = 1;

const DIR = {
  R: {x: 1, y: 0},
  L: {x: -1, y: 0},
  U: {x: 0, y: -1},
  D: {x: 0, y: 1},
}

const fn = (dir, distance) => {
  for (let i = 1; i <= distance; i++) {
    curposition = [curposition[0] + DIR[dir].y, curposition[1] + DIR[dir].x];
    const delta = Math.max(Math.abs(curposition[0] - lastpos[0]), Math.abs(curposition[1] - lastpos[1]));
    console.log('delta', delta, lastpos, curposition);
    if (delta >= 2) {
      lastpos = [curposition[0] - DIR[dir].y, curposition[1] -  + DIR[dir].x];
      if (visited.filter(v => v[0] === lastpos[0] && v[1] === lastpos[1]).length === 0) {
        visited.push(lastpos);
        moves++;
        console.log('add move', moves, lastpos);
      }
    }
}

for (let i = 0; i < lines.length; i++) {
  const dir = lines[i].split(' ')[0];
  const distance = parseInt(lines[i].split(' ')[1], 10);
  console.log(dir, distance);
  if (dir === 'R') {
    for (let i = 1; i <= distance; i++) {
      curposition = [curposition[0], curposition[1] + 1];
      const delta = Math.max(Math.abs(curposition[0] - lastpos[0]), Math.abs(curposition[1] - lastpos[1]));
      console.log('delta', delta, lastpos, curposition);
      if (delta >= 2) {
        lastpos = [curposition[0], curposition[1] - 1];
        if (visited.filter(v => v[0] === lastpos[0] && v[1] === lastpos[1]).length === 0) {
          visited.push(lastpos);
          moves++;
          console.log('add move', moves, lastpos);
        }
      }
    }
    
  }
  if (dir === 'L') {
    for (let i = 1; i <= distance; i++) {
      curposition = [curposition[0], curposition[1] - 1];
      const delta = Math.max(Math.abs(curposition[0] - lastpos[0]), Math.abs(curposition[1] - lastpos[1]));
      console.log('delta', delta, lastpos, curposition);
      if (delta >= 2) {
        lastpos = [curposition[0], curposition[1] + 1];
        if (visited.filter(v => v[0] === lastpos[0] && v[1] === lastpos[1]).length === 0) {
          visited.push(lastpos);
          moves++;
          console.log('add move', moves, lastpos);
        }
      }
    }
  }
  if (dir === 'U') {
    for (let i = 1; i <= distance; i++) {
      curposition = [curposition[0] - 1, curposition[1]];
      const delta = Math.max(Math.abs(curposition[0] - lastpos[0]), Math.abs(curposition[1] - lastpos[1]));
      console.log('delta', delta, lastpos, curposition);
      if (delta >= 2) {
        lastpos = [curposition[0] + 1, curposition[1]];
        if (visited.filter(v => v[0] === lastpos[0] && v[1] === lastpos[1]).length === 0) {
          visited.push(lastpos);
          moves++;
          console.log('add move', moves, lastpos);
        }
      }
    }
  }
  if (dir === 'D') {
    for (let i = 1; i <= distance; i++) {
      curposition = [curposition[0] + 1, curposition[1]];
      const delta = Math.max(Math.abs(curposition[0] - lastpos[0]), Math.abs(curposition[1] - lastpos[1]));
      console.log('delta', delta, lastpos, curposition);
      if (delta >= 2) {
        console.log('delta', delta);
        lastpos = [curposition[0] - 1, curposition[1]];
        if (visited.filter(v => v[0] === lastpos[0] && v[1] === lastpos[1]).length === 0) {
          visited.push(lastpos);
          moves++;
          console.log('add move', moves, lastpos);
        }
      }
    }
  }
}

console.log(moves);

