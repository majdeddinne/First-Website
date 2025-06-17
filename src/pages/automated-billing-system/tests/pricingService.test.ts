import { PricingService } from '../src/services/pricingService';

describe('PricingService', () => {
    let pricingService: PricingService;

    beforeEach(() => {
        pricingService = new PricingService();
    });

    test('should return the base price for a service', () => {
        const serviceName = 'Ghost Production';
        const basePrice = pricingService.getBasePrice(serviceName);
        expect(basePrice).toBeGreaterThan(0);
    });

    test('should calculate add-ons correctly', () => {
        const addOns = ['Mixing', 'Mastering'];
        const totalAddOns = pricingService.calculateAddOns(addOns);
        expect(totalAddOns).toBeGreaterThan(0);
    });

    test('should apply discounts correctly', () => {
        const originalPrice = 100;
        const discount = 10; // 10%
        const finalPrice = pricingService.applyDiscounts(originalPrice, discount);
        expect(finalPrice).toBe(90);
    });
});