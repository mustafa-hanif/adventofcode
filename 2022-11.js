var fs = require('fs');
const file = fs.readFileSync('input2022-11.txt', 'utf8').trimEnd();
let lines = file.split('\n');

let i = 0;
const monkeys = new Array(8).fill(null).map(() => []);
const activeMonkeys = new Array(8).fill(0);

// reddit told me about * all the divisors, I knew % was involved but I didn't know how to get the divisors
let product = 9699690;
for (let j = 0; j < 10000; j++) {
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    // console.log(line)
    if (line.match(/Monkey ([0-9])+:/m)) {
      const monkey = parseInt(line.match(/Monkey ([0-9])+:/m)[1], 10);
      // console.log('starting new monkey', monkey);

      let itemsString = lines[i + 1];
      let items = itemsString.match(/  Starting items: (.*)/m)[1].split(', ').map(Number);
      if (j === 0) {
        monkeys[monkey] = [...items, ...monkeys[monkey]];
      }

      let opString = lines[i + 2];
      // Operation: new = old * 19
      let ops = opString.match(/  Operation: new = old (.*) (.*)/m)[1];
      // console.log(ops);

      let opValue = opString.match(/  Operation: new = old (.*) (.*)/m)[2];
      // console.log(opValue);

      let testString = lines[i + 3];
      //   Test: divisible by 
      let test = parseInt(testString.match(/  Test: divisible by (.*)/m)[1], 10);
      // if (j === 0) {
      //   product = product * test;
      // }
      // console.log(test);

      let _true = lines[i + 4];
      //     If true: throw to monkey 2
      let trueMonkey = parseInt(_true.match(/    If true: throw to monkey (.*)/m)[1], 10);

      //    If false: throw to monkey 0
      let _false = lines[i + 5];
      let falseMonkey = parseInt(_false.match(/    If false: throw to monkey (.*)/m)[1], 10);

      // console.log(trueMonkey, falseMonkey, 'working on items', monkeys[monkey]);
      const copyItems = [...monkeys[monkey]];
      for (let i = 0; i < copyItems.length; i++) {
        const item = copyItems[i];
        let result = item;
        let value = Number.isInteger(parseInt(opValue, 10)) ? parseInt(opValue, 10) : item;
        // console.log('perform op', ops, value);
        switch (ops) {
          case '*':
            result = item * value;
            break;
          case '+':
            result = item + value;
            break;
          case '-':
            result = item - value;
            break;
          case '/':
            result = item / value;
            break;
          default:
            break;
        }
        // console.log('result', result);
        // result = Math.floor(result / 3);
        // console.log('result', result);
        result = result % product;
        if (result % test === 0) {
          // console.log('true', trueMonkey);
          monkeys[trueMonkey].push(result);
          monkeys[monkey].splice(monkeys[monkey].indexOf(item), 1);
        } else {
          // console.log('false', result, test, result % test, (result % test) + test);
          monkeys[falseMonkey].push(result);
          monkeys[monkey].splice(monkeys[monkey].indexOf(item), 1);
        }
        activeMonkeys[monkey]++;
      };
    }
    // console.log(monkeys);
    i+=7;
  }
}
console.log(activeMonkeys)
const sorted = activeMonkeys.sort((a, b) => b - a);
console.log(sorted[0] * sorted[1]);
