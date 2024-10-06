export interface Book {
  id: string;
  title: string;
  author: string;
  published_year: number;
  created_at: string;
}

export interface CreateBook {
  title: string;
  published_year: number;
  author: string;
}

export interface UpdateBookAttributed {
  title: string;
  author: string;
  published_year: number;
}
export interface UpdateBook {
  id: string;
  updatedData: UpdateBookAttributed;
}

export interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}
