import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

export class UserValidator {
  constructor() {}

  validateUser = (schema: Joi.ObjectSchema) => {
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

export const CreateUserSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

export const LoginSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
