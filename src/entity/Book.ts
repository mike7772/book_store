import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column()
  coverImage: string;

  @Column()
  point: number;

  @Column("text", { array: true })
  tags: string[];
}
