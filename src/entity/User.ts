import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  point: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  order: Order;
}
