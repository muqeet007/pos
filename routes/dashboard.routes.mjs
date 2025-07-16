import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.mjs';
import { protect, adminOnly } from '../middlewares/auth.middleware.mjs';

const router = express.Router();

router.get('/stats', protect, adminOnly, getDashboardStats);

export default router;
