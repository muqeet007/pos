import PDFDocument from 'pdfkit';
import { Order } from '../models/Order.mjs';

export const generateReceipt = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('createdBy', 'name');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=receipt-${order._id}.pdf`);

    doc.pipe(res);

    doc.fontSize(20).text('POS Invoice Receipt', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Customer Name: ${order.customerName}`);
    doc.text(`Created By: ${order.createdBy?.name}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
    doc.moveDown();

    doc.text('Items:', { underline: true });
    order.items.forEach((item) => {
      const line = `${item.quantity} x ${item.product.name} - Rs. ${item.product.price} each`;
      doc.text(line);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: Rs. ${order.totalAmount}`, { align: 'right' });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
