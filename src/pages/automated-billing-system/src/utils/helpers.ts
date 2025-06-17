export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

export function validateClientInput(input: any): boolean {
    // Basic validation logic (can be expanded)
    return input && typeof input.name === 'string' && typeof input.email === 'string';
}

export function calculateTotal(prices: number[]): number {
    return prices.reduce((total, price) => total + price, 0);
}