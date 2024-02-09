import { Request, Response, NextFunction } from "express";
import BookRepo from "../repository/BookRepo";
import { BookResponse } from "../Interface/IBook";

export default class BookService {
  constructor() {}

  createBook = async (req: Request, res: Response, next: NextFunction) => {
    BookRepo.createBook(req.body)
      .then((value: BookResponse) => {
        if (value.status || value.title) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: [
            "Unable to create the book. A book with the title you provided already exists.",
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

  bulkImportBook = async (req: Request, res: Response, next: NextFunction) => {
    BookRepo.bulkImportBook(req.body)
      .then((value: BookResponse) => {
        if (value.status) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: [
            "Unable to create the book. A book with the title you provided already exists.",
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

  ListBook = async (req: Request, res: Response, next: NextFunction) => {
    BookRepo.ListBook(req.body)
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: ["Unable to Search books."],
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: ["Internal Server Error."],
        });
      });
  };

  getTags = async (req: Request, res: Response, next: NextFunction) => {
    BookRepo.getTags()
      .then((value) => {
        if (value) {
          return res.status(200).json({
            success: true,
            data: value,
          });
        }
        res.status(401).json({
          success: false,
          errors: ["Unable to list the tags"],
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
