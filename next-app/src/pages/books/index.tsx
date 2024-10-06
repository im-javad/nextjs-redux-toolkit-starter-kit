import { fetchBooks, selectAllBooks } from "@/toolkit/slices/booksSlice";
import { AppDispatch, RootState } from "@/toolkit/store";
import { Book } from "@/types/books";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Books: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  if (!(books.length === 0)) {
    console.log(books);
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-red-500 font-bold text-center text-xl mt-4">
        Books List is here now:
      </h1>
      <ul>
        {books.map((book: Book) => (
          <li
            key={book.id}
            className="border my-5 border-spacing-3 border-cyan-700 p-3"
          >
            <Link href={`/books/${book.id}`}>
              <h2>Title: {book.title}</h2>
            </Link>
            <p>Author: {book.author}</p>
          </li>
        ))}
      </ul>
      <div className="add-book">
        <Link href={"/books/new"}>Add A New Book</Link>
      </div>
    </div>
  );
};

export default Books;
