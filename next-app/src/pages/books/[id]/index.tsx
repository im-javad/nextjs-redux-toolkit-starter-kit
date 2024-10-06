import { fetchBookById, selectBookById } from "@/toolkit/slices/booksSlice";
import { AppDispatch, RootState } from "@/toolkit/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Book: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const book = useSelector((state: RootState) =>
    selectBookById(state, id as string)
  );
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id as string));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No Book Found</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Price: {book.published_year}</p>
      <p>Created At: {book.created_at}</p>
      EDIT {"=>"} <Link href={`/books/${id}/edit`}>EDITING BTN</Link>
      <br />
      DELETE {"=>"} <Link href={`/books/${id}/delete`}>DELETE BTN</Link>
    </div>
  );
};

export default Book;
