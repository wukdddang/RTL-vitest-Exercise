export const PRICE_PER_ITEM = {
  scoops: 2000,
  toppings: 1500,
} as const

export type IceCreamSundae = keyof typeof PRICE_PER_ITEM
export type TasteOfScoops = 'Vanilla' | 'Chocolate'
export type TasteOfToppings = 'Cherries' | 'M&Ms' | 'Hot Fudge'
