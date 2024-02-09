import { Request, Response, NextFunction } from "express";
import UserRepo from "../repository/UserRepo";
import { UserResponse } from "../Interface/IUser";

export default class UserService {
  constructor() {}

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    UserRepo.createUser(req.body)
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: [
            "Couldn't create the user. A user has already been registered using the email or user name",
          ],
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: ["Internal Server Error."],
        });
      });
  };

  Login = async (req: Request, res: Response, next: NextFunction) => {
    UserRepo.Login(req.body)
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: ["Please enter a correct Username and Password"],
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: ["Internal Server Error."],
        });
      });
  };
}
