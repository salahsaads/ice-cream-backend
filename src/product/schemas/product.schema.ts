import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  rate: Number,
  image: String,
});
