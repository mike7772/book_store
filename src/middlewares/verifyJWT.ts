import { VerifyErrors, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TokenData } from "../Interface/IUser";
const dotenv = require("dotenv");
dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        errors: ["Authorization header missing."],
      });
    }

    // Extract token from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    // Verify token
    verify(
      token,
      process.env.JWT_SECRET!,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          console.error("Token verification failed: ", err);
          return res.status(401).json({
            success: false,
            errors: ["Invalid token."],
          });
        }

        // Check if decoded token contains the required data
        const tokenData = decoded as TokenData;

        // if (
        //   (req.params?.id && tokenData.id !== parseInt(req.params.id)) ||
        //   (req.body?.userId && tokenData.id !== parseInt(req.body.userId))
        // ) {
        //   return res.status(401).json({
        //     success: false,
        //     errors: ["Token does not match user ID."],
        //   });
        // }

        // Token is valid and user is authorized
        next();
      }
    );
  } catch (error) {
    console.error("Error verifying token: ", error);
    return res.status(500).json({
      success: false,
      errors: ["Internal server error."],
    });
  }
};
