import express from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/productController";
import validate from "../middleware/validate";
import { productSchema } from "../validators/productValidator";

const router = express.Router();

router.post("/", validate(productSchema), createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);

export default router;
