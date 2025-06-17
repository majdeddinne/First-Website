import { BillingService } from '../src/services/billingService';

describe('BillingService', () => {
    let billingService: BillingService;

    beforeEach(() => {
        billingService = new BillingService();
    });

    test('should calculate subtotal correctly', () => {
        const services = [
            { price: 100, quantity: 2 },
            { price: 50, quantity: 1 }
        ];
        const subtotal = billingService.calculateSubtotal(services);
        expect(subtotal).toBe(250);
    });

    test('should calculate tax correctly', () => {
        const subtotal = 250;
        const taxRate = 0.1; // 10%
        const tax = billingService.calculateTax(subtotal, taxRate);
        expect(tax).toBe(25);
    });

    test('should generate invoice correctly', () => {
        const services = [
            { price: 100, quantity: 2 },
            { price: 50, quantity: 1 }
        ];
        const taxRate = 0.1; // 10%
        const invoice = billingService.generateInvoice(services, taxRate);
        
        expect(invoice).toHaveProperty('invoiceNumber');
        expect(invoice).toHaveProperty('clientDetails');
        expect(invoice.totalAmount).toBe(275); // 250 subtotal + 25 tax
    });
});