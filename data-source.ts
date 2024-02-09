import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./src/entity/User";
import { Book } from "./src/entity/Book";
import { Order } from "./src/entity/Order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "@360Ground",
  database: "book_store",
  synchronize: true,
  logging: false,
  entities: [User, Book, Order],
  migrations: [],
  subscribers: [],
});
