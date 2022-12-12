var fs = require("fs");
const file = fs.readFileSync("input2022-12.txt", "utf8").trimEnd();
let lines = file.split("\n");

const map = lines.map((line) => line.split(""));

// console.log(map);

let _S = -1;
let E = -1;
map.forEach((line, i) => {
  line.forEach((c, j) => {
    if (c === "S") {
      _S = [i, j];
    }
    if (c === "E") {
      E = [i, j];
    }
  });
});
// console.log(S, E);

map[_S[0]][_S[1]] = "a";
map[E[0]][E[1]] = "z";

let allStartingPos = [];
let best = Number.MAX_VALUE;
map.forEach((line, i) => {
  line.forEach((c, j) => {
    if (c === "a") {
      allStartingPos.push([i, j]);
    }
  });
});

console.log(allStartingPos.length);
for (let k = 0; k < allStartingPos.length; k++) {
  const S = allStartingPos[k];
  // console.log(E, S);
  const frontier = [S];
  const cameFrom = new Map();
  cameFrom.set(`${S}`, null);

  while (frontier.length > 0) {
    const current = frontier.shift();
    const [i, j] = current;
    const here = map[i][j].charCodeAt(0);
    const neighbors = [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ];
    for (const next of neighbors) {
      const [i, j] = next;
      if (i < 0 || i >= map.length || j < 0 || j >= map[0].length) {
        continue;
      }
      const there = map[i][j].charCodeAt(0);
      // console.log(here, there);
      if (there - here > 1) {
        continue;
      }
      if (cameFrom.has(`${next}`)) {
        continue;
      }
      if (next) {
        frontier.push(next);
        cameFrom.set(`${next}`, `${current}`);
        if (next[0] === E[0] && next[1] === E[1]) {
          console.log('reach goal');
          break;
        }
      }
    }
  }

  // console.log('reach goal')

  let current = `${E}`;
  const path = [];

  // console.dir(cameFrom);
  while (current != `${S}`) {
    path.push(current);
    // console.log(path, current);
    if (cameFrom.get(current)) {
      current = cameFrom.get(current);
    } else {
      // console.log("no path");
      break;
    }
  }

  path.push(`${S}`);
  path.reverse();

  if (path.length > 2) {
    console.log(path.length - 1);
    best = Math.min(best, path.length - 1);
  }
}
console.log(best);
