export class PricingService {
    private basePrices: { [key: string]: number };
    private addOns: { [key: string]: number };
    private discounts: { [key: string]: number };

    constructor() {
        this.basePrices = {
            'Ghost Production': 500,
            'Remix': 300,
            // Add more services and their base prices as needed
        };

        this.addOns = {
            'Vocal Tuning': 100,
            'Mixing': 150,
            // Add more add-ons and their prices as needed
        };

        this.discounts = {
            'New Customer': 0.1, // 10% discount
            'Seasonal Promotion': 0.15, // 15% discount
            // Add more discounts as needed
        };
    }

    getBasePrice(service: string): number {
        return this.basePrices[service] || 0;
    }

    calculateAddOns(selectedAddOns: string[]): number {
        return selectedAddOns.reduce((total, addOn) => {
            return total + (this.addOns[addOn] || 0);
        }, 0);
    }

    applyDiscounts(totalAmount: number, discountCode: string): number {
        const discount = this.discounts[discountCode] || 0;
        return totalAmount - (totalAmount * discount);
    }
}