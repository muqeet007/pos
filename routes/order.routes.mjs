import express from 'express';
import { getMyOrders } from '../controllers/order.controller.mjs';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/order.controller.mjs';

import { protect } from '../middlewares/auth.middleware.mjs';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.get('/my', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrderStatus)
  .delete(protect, deleteOrder);

  

export default router;
