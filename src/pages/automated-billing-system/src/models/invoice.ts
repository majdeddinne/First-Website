export interface Invoice {
    invoiceNumber: string;
    clientDetails: {
        name: string;
        address: string;
        email: string;
    };
    serviceBreakdown: Array<{
        serviceName: string;
        description: string;
        amount: number;
    }>;
    totalAmount: number;
    issueDate: Date;
    dueDate: Date;
}