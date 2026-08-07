import { Document, Types } from 'mongoose';

export interface Order extends Document {
  readonly userId: Types.ObjectId;

  readonly products: {
    productId: Types.ObjectId;
    count: number;
  }[];

  readonly address: string;

  readonly phoneNumber: string;

  readonly paymentId?: string;
}
