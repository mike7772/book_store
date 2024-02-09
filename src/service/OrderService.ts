import { Request, Response, NextFunction } from "express";
import OrderRepo from "../repository/OrderRepo";
import { OrderResponse } from "../Interface/IOrder";

export default class UserService {
  constructor() {}

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    OrderRepo.createOrder(req.body)
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: ["Couldn't create an order."],
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: ["Internal Server Error."],
        });
      });
  };

  completeOrder = async (req: Request, res: Response, next: NextFunction) => {
    OrderRepo.completeOrder(req.body)
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: ["our order exceeds the points you have."],
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: ["Internal Server Error."],
        });
      });
  };

  cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    OrderRepo.cancelOrder(Number(id))
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: ["Couldn't cancel the order."],
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: ["Internal Server Error."],
        });
      });
  };

  listOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { id, status } = req.params;
    OrderRepo.listOrder(Number(id), status)
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: ["Couldn't list the orders."],
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
