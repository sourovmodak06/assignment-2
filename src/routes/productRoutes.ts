import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import validate from "../middleware/validate";
import { productSchema } from "../validators/productValidator";

const router = express.Router();

router.post("/", validate(productSchema), createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.put('/:productId', validate(productSchema), updateProduct);

export default router;
