import * as jwt from "jsonwebtoken";
// import { Secret, SignOptions } from "jsonwebtoken";

export default (
  payload: object,
  secret: string,
  expiresIn?: string | number | undefined
): string => {
  return jwt.sign(payload, secret, expiresIn ? { expiresIn } : undefined);
};
