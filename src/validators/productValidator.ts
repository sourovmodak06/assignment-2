import { z } from 'zod';

const variantSchema = z.object({
  type: z.string().nonempty("Variant type is required"),
  value: z.string().nonempty("Variant value is required")
});

const inventorySchema = z.object({
  quantity: z.number().nonnegative("Quantity cannot be negative"),
  inStock: z.boolean()
});

export const productSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().nonnegative("Price cannot be negative"),
  category: z.string().nonempty("Category is required"),
  tags: z.array(z.string()),
  variants: z.array(variantSchema),
  inventory: inventorySchema
});
