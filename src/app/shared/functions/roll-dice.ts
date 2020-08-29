export function rollDice(numDice: number, numSides: number) {
  var result: number = 0;
  for (let i = 0; i < numDice ; i++) {
    result += Math.floor(Math.random() * numSides + 1);
  }
  return result;
}
