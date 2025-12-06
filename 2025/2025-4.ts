var fs = require('fs');

const line1 = fs.readFileSync('input4.txt', 'utf8');

const lines = line1.split('\n');

const grid = [];
for (let line of lines) {
  grid.push(line.split(""));
}

function ifAtTheRate(grid: string[][], i: number, j: number): number {
  if (i >= 0 && j >= 0 && i < grid.length && j < grid[i].length) {
    if (grid[i][j] === "@") {
      return 1;
    }
  }
  return 0;
}

let sum = 0;
let sum1 = 0;

do {
  sum = sum1;
  for (let i = 0; i < grid.length; i++) {
    let output = "";
    for (let j = 0; j < grid[i].length; j++) {
      let current = grid[i][j];
      const count = ifAtTheRate(grid, i-1, j) + ifAtTheRate(grid, i+1, j) +
                    ifAtTheRate(grid, i, j-1) + ifAtTheRate(grid, i, j+1) + 
                    ifAtTheRate(grid, i-1, j-1) + ifAtTheRate(grid, i-1, j+1) +
                    ifAtTheRate(grid, i+1, j-1) + ifAtTheRate(grid, i+1, j+1);
      
      if (current === "@" && count < 4) {
        output += "x";
        grid[i][j] = "x";
        sum1 += 1;
      } else {
        output += current;
      }
    }
    console.log(output);
  }

  console.log({ sum1, sum })
  for  (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "x") {
        grid[i][j] = ".";
      }
    }
  }
} while (sum !== sum1)



console.log(sum);