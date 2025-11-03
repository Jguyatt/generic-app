export function combineAmericanOdds(odds: number[]) {
  // naive demo: convert to decimal, multiply, back to american
  const toDec = (o: number) => o > 0 ? 1 + o / 100 : 1 + 100 / Math.abs(o)
  const product = odds.map(toDec).reduce((a, b) => a * b, 1)
  const back = product >= 2 ? (product - 1) * 100 : -100 / (product - 1)
  return Math.round(back)
}

export function calculatePotentialReturn(stake: number, odds: number[]): number {
  const combinedOdds = combineAmericanOdds(odds)
  const decimal = combinedOdds > 0 ? 1 + combinedOdds / 100 : 1 + 100 / Math.abs(combinedOdds)
  return stake * decimal
}

