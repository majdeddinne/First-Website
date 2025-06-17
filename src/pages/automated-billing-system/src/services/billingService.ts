class BillingService {
    calculateSubtotal(services: Array<{ price: number; quantity: number }>): number {
        return services.reduce((total, service) => total + service.price * service.quantity, 0);
    }

    calculateTax(subtotal: number, taxRate: number): number {
        return subtotal * taxRate;
    }

    generateInvoice(services: Array<{ price: number; quantity: number }>, taxRate: number): { subtotal: number; tax: number; total: number } {
        const subtotal = this.calculateSubtotal(services);
        const tax = this.calculateTax(subtotal, taxRate);
        const total = subtotal + tax;

        return { subtotal, tax, total };
    }
}

export default BillingService;