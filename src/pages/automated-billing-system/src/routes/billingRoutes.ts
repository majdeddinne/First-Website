import { Router } from 'express';
import { BillingController } from '../controllers/billingController';

const router = Router();
const billingController = new BillingController();

router.post('/invoices', billingController.createInvoice.bind(billingController));
router.get('/invoices/:id', billingController.getInvoice.bind(billingController));
router.get('/invoices', billingController.getAllInvoices.bind(billingController));

export default router;