var fs = require('fs');

const file = fs.readFileSync('2.txt', 'utf8');
let lines = file.split('\n');
let count = 0;

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const gameid = lines[i].split('Game ')[1].split(':')[0];
  // console.log(Number(gameid));

  const games = lines[i].split(':')[1].split(';');
  // console.log(games);
  let r = 0;
  let g = 0;
  let b = 0;
  games.forEach((game) => {
    const colors = game.split(',').map(c => c.trim());
    colors.forEach((_color) => {
      const [count, color] = _color.split(' ');
      if (color === 'red') {
        r = Math.max(Number(count), r);
      } else if (color === 'green') {
        g = Math.max(Number(count), g);
      } else if (color === 'blue') {
        b = Math.max(Number(count), b);
      }
    });
  });
  // part 1
  // if (r < 13 && g < 14 && b < 15) {
  //   sum += Number(gameid);
  // }
  sum += (r*g*b);
  // console.log(r, g, b);
}
console.log(sum);
