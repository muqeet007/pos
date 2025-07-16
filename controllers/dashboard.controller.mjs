import { Order } from '../models/Order.mjs';
import { Product } from '../models/Product.mjs';
import { User } from '../models/User.mjs';

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);
    const totalProducts = await Product.countDocuments();
    const totalStaff = await User.countDocuments({ role: 'staff' });

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalProducts,
      totalStaff
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
