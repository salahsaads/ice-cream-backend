import { Document } from 'mongoose';

export interface Users extends Document {
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly role: string;
}
