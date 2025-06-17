import { Request, Response } from 'express';
import { BillingService } from '../services/billingService';
import { InvoiceService } from '../services/invoiceService';

export class BillingController {
    private billingService: BillingService;
    private invoiceService: InvoiceService;

    constructor() {
        this.billingService = new BillingService();
        this.invoiceService = new InvoiceService();
    }

    public createInvoice = async (req: Request, res: Response): Promise<void> => {
        try {
            const invoiceData = req.body;
            const invoice = await this.billingService.generateInvoice(invoiceData);
            const formattedInvoice = this.invoiceService.formatInvoice(invoice);
            res.status(201).json(formattedInvoice);
        } catch (error) {
            res.status(500).json({ message: 'Error creating invoice', error });
        }
    };

    public getInvoice = async (req: Request, res: Response): Promise<void> => {
        try {
            const invoiceId = req.params.id;
            const invoice = await this.invoiceService.getInvoiceById(invoiceId);
            if (!invoice) {
                res.status(404).json({ message: 'Invoice not found' });
                return;
            }
            res.status(200).json(invoice);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving invoice', error });
        }
    };

    public getAllInvoices = async (req: Request, res: Response): Promise<void> => {
        try {
            const invoices = await this.invoiceService.getAllInvoices();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving invoices', error });
        }
    };
}