import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import OrderService from "../service/OrderService";
import {
  CreateOrderSchema,
  OrderValidator,
} from "../validators/OrderValidator";
import verifyJWT from "../middlewares/verifyJWT";

const orderValidator = new OrderValidator();
class OrderController {
  router = Router();
  orderService = new OrderService();

  constructor() {
    this.intializeRoutes();
  }

  //   change
  intializeRoutes() {
    this.router
      .route("/")
      .post(
        orderValidator.validateOrder(CreateOrderSchema),
        verifyJWT,
        this.orderService.createOrder
      );
    this.router
      .route("/complete")
      .post(
        orderValidator.validateOrder(CreateOrderSchema),
        verifyJWT,
        this.orderService.completeOrder
      );
    this.router
      .route("/list/:id/:status")
      .get(verifyJWT, this.orderService.listOrder);
    this.router
      .route("/cancel/:id")
      .get(verifyJWT, this.orderService.cancelOrder);
  }
}
export default new OrderController().router;
