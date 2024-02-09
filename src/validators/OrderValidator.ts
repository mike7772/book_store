import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

export class OrderValidator {
  constructor() {}

  validateOrder = (schema: Joi.ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const val = await schema.validateAsync(req.body);
        req.body = val;
        next();
      } catch (err) {
        const messages = (err as Joi.ValidationError)?.details
          .map((i) => i.message)
          .join(",");

        res.status(422).json({
          success: false,
          errors: [messages],
        });
      }
    };
  };
}

export const CreateOrderSchema = Joi.object().keys({
  bookId: Joi.array().items(Joi.number()).required(),
  userId: Joi.number().required(),
  quantity: Joi.array().items(Joi.number()).required(),
});

export const GetOrderSchema = Joi.object().keys({
  id: Joi.number().required(),
});
