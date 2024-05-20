import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  email: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
