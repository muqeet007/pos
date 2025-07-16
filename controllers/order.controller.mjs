import { Order } from '../models/Order.mjs';
import { Product } from '../models/Product.mjs';

// Create Order
export const createOrder = async (req, res) => {
  const { customerName, items } = req.body;

  try {
    // Calculate total
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ message: `Product not found: ${item.product}` });

      totalAmount += product.price * item.quantity;

      // Optionally reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      customerName,
      items,
      totalAmount,
      createdBy: req.user._id,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').populate('createdBy', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
