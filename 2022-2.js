var fs = require('fs');

const file = fs.readFileSync('input2022-2.txt', 'utf8');
let lines = file.split('\n');

// 0 2 = 0 wins
// 1 0 = 1 wins
// 2 1 = 2 wins

// 0 1 = 0 lose
// 1 2 = 1 lose
// 2 0 = 2 lose

const win = [2, 0, 1];
const lose = [1, 2, 0];

let score = 0;

const part2 = (score, p1, p2) => {
  // draw
  if (p2 === 1) {
    score += p1 + 1;
    score += 3;
  } 
  // lose
  else if (p2 === 0) {
    score += win[p1] + 1;
  } else {
    score += lose[p1] + 1;
    score += 6;
  }
  return score;
}

const part1 = (score, p1, p2) => {
  score += p2 + 1;
  if (p1 === p2) {
    score += 3;
  } else if (p2 === lose[p1]) {
    score += 6;
  }
  return score;
}

for (let i = 0; i < lines.length; i++) {
  const p1 = lines[i].split(' ')[0].charCodeAt(0) - 65;
  const p2 = lines[i].split(' ')[1].charCodeAt(0) - 88;
  // console.log(p1, p2)
  // score = part1(score, p1, p2);
  score = part2(score, p1, p2);
}

console.log(score);

