export interface CreateBook {
  title: string;
  writer: string;
  coverImage: string;
  point: number;
  tags: string[];
}

export interface BulkImportBook {
  map(arg0: (book: any) => void): unknown;
  data: CreateBook[];
}

export interface BookResponse {
  status: boolean;
  title?: string;
  writer?: string;
  coverImage?: string;
  point?: string;
  tags?: string[];
}

export interface ListBook {
  title?: string;
  writer?: string;
  point?: number;
  tags?: string[];
}
