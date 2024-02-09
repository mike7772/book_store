import { Router } from "express";
import BookService from "../service/BookService";
import { Request, Response, NextFunction } from "express";
import {
  BookValidator,
  CreateBookSchema,
  ListBookSchema,
} from "../validators/BookValidator";

const bookValidator = new BookValidator();
class BookController {
  router = Router();
  bookService = new BookService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route("/tags").get(this.bookService.getTags);
    this.router
      .route("/")
      .post(
        bookValidator.validateBook(CreateBookSchema),
        this.bookService.createBook
      );
    this.router
      .route("/bulk")
      .post(
        bookValidator.validateBook(CreateBookSchema),
        this.bookService.bulkImportBook
      );
    this.router.route("/list").post(this.bookService.ListBook);
  }
}
export default new BookController().router;
