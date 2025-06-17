export const products = {
  track1: {
    priceId: 'price_1RHTxFR3SiaZWpiwigyYASEq',
    name: 'Track 1',
    description: 'hyper techno, 140BPM',
    mode: 'payment' as const,
  },
} as const;

export type ProductId = keyof typeof products;