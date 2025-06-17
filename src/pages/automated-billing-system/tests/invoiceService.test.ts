import { InvoiceService } from '../src/services/invoiceService';
import { Invoice } from '../src/models/invoice';

describe('InvoiceService', () => {
    let invoiceService: InvoiceService;

    beforeEach(() => {
        invoiceService = new InvoiceService();
    });

    it('should format the invoice correctly', () => {
        const invoice: Invoice = {
            invoiceNumber: 'INV-001',
            clientDetails: {
                name: 'John Doe',
                address: '123 Main St',
                email: 'john.doe@example.com'
            },
            serviceBreakdown: [
                { service: 'Ghost Production', amount: 500 },
                { service: 'Remix', amount: 300 }
            ],
            totalAmount: 800
        };

        const formattedInvoice = invoiceService.formatInvoice(invoice);
        expect(formattedInvoice).toContain('Invoice Number: INV-001');
        expect(formattedInvoice).toContain('Client: John Doe');
        expect(formattedInvoice).toContain('Total Amount: $800');
    });

    it('should send the invoice successfully', () => {
        const invoice: Invoice = {
            invoiceNumber: 'INV-002',
            clientDetails: {
                name: 'Jane Smith',
                address: '456 Elm St',
                email: 'jane.smith@example.com'
            },
            serviceBreakdown: [
                { service: 'Mixing', amount: 400 }
            ],
            totalAmount: 400
        };

        const sendResult = invoiceService.sendInvoice(invoice);
        expect(sendResult).toBe(true);
    });
});