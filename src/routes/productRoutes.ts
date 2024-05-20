import express from "express";
import { createProduct, getAllProducts } from "../controllers/productController";
import validate from "../middleware/validate";
import { productSchema } from "../validators/productValidator";

const router = express.Router();

router.post("/", validate(productSchema), createProduct);
router.get('/', getAllProducts);

export default router;
