import { Schema, Document, connection } from 'mongoose';

import { USER_VIEW_MODEL, ObjectId } from '../utils';

export interface UserViewDocument extends Document {
  readonly _id: ObjectId;
  readonly userId: string;
  readonly viewDate: Date;
  readonly productId: string;
}

export const UserViewSchema = new Schema(
  {
    userId: { type: String, required: true },
    viewDate: { type: Date, required: true },
    productId: { type: String, required: true },
  },
  { collection: 'UserView' },
) as any;

export const userViewModel = connection.model<UserViewDocument>(
  USER_VIEW_MODEL,
  UserViewSchema,
  'UserView',
);
