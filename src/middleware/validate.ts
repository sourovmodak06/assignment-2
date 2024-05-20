import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod'; 

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: unknown) { 
    if (error instanceof ZodError) { 
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: 'Internal Server Error' }); 
    }
  }
};

export default validate;
