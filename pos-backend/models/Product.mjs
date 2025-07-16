import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  barcode: {
    type: String,
    unique: true,
  }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
