var fs = require('fs');

const line = fs.readFileSync('input3.txt', 'utf8');

const banks = line.split('\n');

let sum = 0;

for (let bank of banks) {
  let n = 12;
  let theNumbers = new Array(n);
  let theIndex = new Array(n);
  for (let l = 0; l < n; l++) {
    theIndex[l] = 0;
    theNumbers[l] = 0;
  }
  // let tens = 0;
  // let tenIndex = 0;
  // let ones = 0;
  let digits = bank.split("");
  

  for (let x = 0; x < n; x++) {
    // console.log(theIndex[x], digits.length - (n - x - 1))
    for (let i = theIndex[x]; i < digits.length - (n - x - 1); i++) {
      if (digits[i] > theNumbers[x]) {
        theNumbers[x] = digits[i];
        theIndex[x+1] = i + 1;
      }
    }
  }
  
  // console.log(theNumbers);

  const final = Number(theNumbers.join(""));
  // console.log(final);
  sum += final;
}

console.log(sum);
