import { Request, Response } from "express";
import Product from "../models/Product";

/* ================== Create a new product Start ================== */
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
};
/* ================== Create a new product End ================== */
