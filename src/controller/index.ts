import { Application } from "express";
import UserController from "./UserController";
import BookController from "./BookController";
import OrderController from "./OrderController";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/user", UserController);
    app.use("/api/book", BookController);
    app.use("/api/order", OrderController);
  }
}
