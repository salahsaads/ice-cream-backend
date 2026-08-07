import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },

      count: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],

  address: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  paymentId: {
    type: String,
  },

 
});