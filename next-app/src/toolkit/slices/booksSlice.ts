import { Book, CreateBook, UpdateBook } from "@/types/books";
import Axios from "@/utils/axiosConfig";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

const booksAdapter = createEntityAdapter<Book>({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = booksAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await Axios.get("/books");
  return response.data.data;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id: string) => {
    const response = await Axios.get(`/books/${id}`);
    return response.data.data;
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (createData: CreateBook) => {
    const res = await Axios.post("/books", createData);
    return res.data;
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, updatedData }: UpdateBook) => {
    const response = await Axios.put(`/books/${id}`, updatedData);
    return response.data.data;
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string) => {
    await Axios.delete(`/books/${id}`);
    return id;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        booksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        booksAdapter.upsertOne(state, action.payload);
      })
      .addCase(createBook.fulfilled, (state, action) => {
        booksAdapter.addOne(state, action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        booksAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        booksAdapter.removeOne(state, action.payload);
      });
  },
});

export default booksSlice.reducer;
export const { selectAll: selectAllBooks, selectById: selectBookById } =
  booksAdapter.getSelectors((state: RootState) => state.books);
