import { AppDataSource } from "../../data-source";
import { BulkImportBook, CreateBook, ListBook } from "../Interface/IBook";
import { Book } from "../entity/Book";

class BookRepo {
  private bookRepository = AppDataSource.getRepository(Book);
  constructor() {}

  createBook = async (data: CreateBook) => {
    const getBookByTitle = await this.bookRepository.findOne({
      where: { title: data.title },
    });

    if (getBookByTitle) {
      return { status: false };
    }

    const book = Object.assign(new Book(), {
      title: data.title,
      writer: data.writer,
      coverImage: data.coverImage,
      point: data.point,
      tags: data.tags,
    });

    return this.bookRepository.save(book);
  };

  bulkImportBook = async (data: BulkImportBook) => {
    data.data?.map(async (book: CreateBook) => {
      const getBookByTitle = await this.bookRepository.findOne({
        where: { title: book.title },
      });
      if (getBookByTitle) {
        return { status: false };
      }

      const bookData = Object.assign(new Book(), {
        title: book.title,
        writer: book.writer,
        coverImage: book.coverImage,
        point: book.point,
        tag: book.tags,
      });

      this.bookRepository.save(bookData);
    });

    return { status: true };
  };

  ListBook = async (data: ListBook, pageNumber: number, pageSize: number) => {
    const queryBuilder = this.bookRepository.createQueryBuilder("Book");

    if (data.title) {
      queryBuilder.andWhere("Book.title LIKE :title", {
        title: `%${data.title}%`,
      });
    }
    if (data.writer) {
      queryBuilder.andWhere("Book.writer LIKE :writer", {
        writer: `%${data.writer}%`,
      });
    }

    if (data.tags && data.tags.length > 0) {
      queryBuilder.andWhere("Book.tags @> ARRAY[:...tags]", {
        tags: data.tags,
      });
    }

    // const total = await this.bookRepository.count();
    // if (total <= pageNumber * pageSize) {
    //   return false;
    // }

    queryBuilder.skip((pageNumber - 1) * pageSize).take(pageSize);

    return await queryBuilder.getMany();
  };

  getTags = async () => {
    const distinctTags = await this.bookRepository
      .createQueryBuilder("Book")
      .select("DISTINCT UNNEST(Book.tags)", "tag")
      .getRawMany();

    const tagsUsed = distinctTags.map((result) => result.tag);

    return tagsUsed;
  };
}

export default new BookRepo();
