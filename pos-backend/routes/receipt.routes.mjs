import express from 'express';
import { generateReceipt } from '../controllers/receipt.controller.mjs';
import { protect } from '../middlewares/auth.middleware.mjs';

const router = express.Router();

router.get('/:id/receipt', protect, generateReceipt);

export default router;
