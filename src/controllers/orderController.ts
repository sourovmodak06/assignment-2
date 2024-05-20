import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";

/* ================== Create a new order Start ================== */
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, productId, price, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    if (product.inventory.quantity < quantity) {
      res.status(400).json({ success: false, message: "Insufficient stock" });
      return;
    }

    const order = new Order({
      email,
      productId,
      price,
      quantity,
    });

    await order.save();
    const remainingQuantity = product.inventory.quantity - quantity;
    const inStock = remainingQuantity > 0 ? true : false;
    await Product.findByIdAndUpdate(productId, {
      $set: {
        "inventory.quantity": remainingQuantity,
        "inventory.inStock": inStock,
      },
    });
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};
/* ================== Create a new order End ================== */

/* ================== Retrieve All Orders Start ================== */
/**
 export const getOrders = async (
     req: Request,
     res: Response
    ): Promise<void> => {
        try {
            const orders = await Order.find();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        } catch (error) {
            res.status(400).json({ success: false, message: (error as Error).message });
        }
    };
*/
/* ================== Retrieve All Orders End ================== */

/* ================== Retrieve Orders by User Email Start ================== */
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEmail: string | undefined = req.query.email as string | undefined;
    let orders;

    if (userEmail) {
      orders = await Order.find({ email: userEmail });
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: orders,
      });
    } else {
      orders = await Order.find();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};
/* ================== Retrieve Orders by User Email End ================== */
