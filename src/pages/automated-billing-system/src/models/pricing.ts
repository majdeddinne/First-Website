export interface Pricing {
    basePrice: number;
    addOns?: AddOn[];
    discounts?: Discount[];
}

export interface AddOn {
    name: string;
    price: number;
}

export interface Discount {
    name: string;
    amount: number;
}