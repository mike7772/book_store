import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

export class BookValidator {
  constructor() {}

  validateBook = (schema: Joi.ObjectSchema) => {
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

export const CreateBookSchema = Joi.object().keys({
  title: Joi.string().required(),
  writer: Joi.string().required(),
  coverImage: Joi.string().uri().required(),
  point: Joi.number().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

export const BulkImportBookSchema = Joi.object().keys({
  data: Joi.array().items(CreateBookSchema).required(),
});

export const ListBookSchema = Joi.object().keys({
  title: Joi.string(),
  writer: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});
