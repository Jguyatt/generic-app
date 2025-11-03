export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export const formatCurrency = (n: number) => 
  n.toLocaleString(undefined, { style: 'currency', currency: 'USD' })

export const formatOdds = (o: number) => (o > 0 ? `+${o}` : `${o}`)

