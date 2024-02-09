import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Book)
  @JoinTable({ name: "selected_book" })
  book: Book[];

  @Column("int", { array: true })
  quantity: number[];

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @Column()
  status: string;

  @Column()
  totalPoint: number;
}
