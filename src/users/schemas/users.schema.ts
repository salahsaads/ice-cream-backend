import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  role: String,
});
