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

/* ================== Retrieve a List of All Products Start ================== */
/**
 export const getAllProducts = async (
   req: Request,
   res: Response
  ): Promise<void> => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: products,
      });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
 */

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const searchTerm: string = req.query.searchTerm as string;
    let products;
    let message: string;
    if (searchTerm) {
      products = await Product.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      });
      message = `Products matching search term '${searchTerm}' fetched successfully!`;
      if (products.length === 0) {
        res.status(404).json({
          success: false,
          message: `No products found matching search term '${searchTerm}'`,
        });
        return;
      }
    } else {
      products = await Product.find();
      message = "Products fetched successfully!";
    }
    res.status(200).json({
      success: true,
      message,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

/* ================== Retrieve a List of All Products End ================== */

/* ================== Retrieve a Specific Product by ID Start ================== */
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.productId);
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: product,
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
};
/* ================== Retrieve a Specific Product by ID End ================== */

/* ================== Update Product Information Start ================== */
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: product,
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
};
/* ================== Update Product Information End ================== */

/* ================== Delete a Product Start ================== */
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
};
/* ================== Delete a Product End ================== */
