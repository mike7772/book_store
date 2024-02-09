import { Book } from "../entity/Book";
import { User } from "../entity/User";

export interface CreateOrder {
  bookId: number[];
  userId: number;
  status: string;
  quantity: number[];
}

export interface OrderResponse {
  valid: boolean;
  book?: Book;
  user?: User;
  status?: string;
}
