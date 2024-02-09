import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { CreateOrder } from "../Interface/IOrder";
import { Book } from "../entity/Book";
import { Order } from "../entity/Order";
import { User } from "../entity/User";

class OrderRepo {
  private orderRepository = AppDataSource.getRepository(Order);
  private bookRepository = AppDataSource.getRepository(Book);
  private userRepository = AppDataSource.getRepository(User);

  constructor() {}

  createOrder = async (data: CreateOrder) => {
    const getUser = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    const getBook = await this.bookRepository.find({
      where: { id: In(data.bookId) },
    });

    const CheckOrder = await this.orderRepository.findOne({
      where: { user: getUser },
      relations: ["book"],
    });

    if (getBook && CheckOrder && CheckOrder.status == "pending") {
      getBook.map((book: Book, index: number) => {
        const getIndex = CheckOrder.book.findIndex((obj) => {
          return obj.id === book.id;
        });

        const exists = getIndex !== -1;

        if (!exists) {
          CheckOrder.book.push(book);
          CheckOrder.quantity.push(data.quantity[index]);
        }
        CheckOrder.quantity[getIndex] = data.quantity[index];
      });

      return this.orderRepository.save(CheckOrder);
    }

    if (getUser && getBook) {
      const order = Object.assign(new Order(), {
        book: getBook,
        user: getUser,
        quantity: data.quantity,
        status: "pending",
        totalPoint: 0,
      });
      return this.orderRepository.save(order);
    }

    return false;
  };

  completeOrder = async (data: CreateOrder) => {
    let totalPoint = 0;

    const getUser = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    const getBook = await this.bookRepository.find({
      where: { id: In(data.bookId) },
    });

    const CheckOrder = await this.orderRepository.findOne({
      where: { user: getUser },
    });

    if (getUser && getBook && CheckOrder) {
      getBook.map((book: Book, index: number) => {
        totalPoint = totalPoint + book.point * data.quantity[index];
      });

      if (getUser.point < totalPoint) {
        return false;
      }

      getUser.point = getUser.point - totalPoint;
      this.userRepository.save(getUser);

      CheckOrder.book = getBook;
      CheckOrder.user = getUser;
      CheckOrder.quantity = data.quantity;
      CheckOrder.status = "completed";
      CheckOrder.totalPoint = totalPoint;

      return this.orderRepository.save(CheckOrder);
    }

    return false;
  };

  cancelOrder = async (data: number) => {
    const ToBeUpdatedOrder = await this.orderRepository.findOne({
      where: { id: data },
    });

    console.log("first");

    if (ToBeUpdatedOrder.status == "pending") {
      ToBeUpdatedOrder.status = "canceled";
      return this.orderRepository.save(ToBeUpdatedOrder);
    }

    return false;
  };

  listOrder = async (data: number, status: string) => {
    const user = await this.userRepository.find({
      where: { id: data },
    });

    if (!user) {
      return false;
    }

    const orders = await this.orderRepository.find({
      where: { user: user, status },
      relations: ["book"],
    });

    return orders;
  };
}
export default new OrderRepo();
