import { Router } from "express";
import UserService from "../service/UserService";
import {
  CreateUserSchema,
  LoginSchema,
  UserValidator,
} from "../validators/UserValidator";

const userValidator = new UserValidator();
class UserController {
  router = Router();
  userService = new UserService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router
      .route("/")
      .post(
        userValidator.validateUser(CreateUserSchema),
        this.userService.createUser
      );

    this.router
      .route("/login")
      .post(userValidator.validateUser(LoginSchema), this.userService.Login);
  }
}
export default new UserController().router;
