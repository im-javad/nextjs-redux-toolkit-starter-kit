import {
  deleteBook,
  fetchBookById,
  selectBookById,
} from "@/toolkit/slices/booksSlice";
import { AppDispatch, RootState } from "@/toolkit/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteBook: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const book = useSelector((state: RootState) =>
    selectBookById(state, id as string)
  );

  const handleDeleteBook = async () => {
    await dispatch(deleteBook(id as string));
    router.push("/books");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id as string));
    }
  }, [dispatch, id]);

  if (!book) return <p>Loading....</p>;

  return (
    <div>
      selected book detail is :
      <ul className="flex flex-col">
        <li>Title: {book.title} </li>
        <li>Published: {book.published_year} </li>
        <li>Author: {book.author} </li>
        <li>Date: {book.created_at} </li>
      </ul>
      <button onClick={handleDeleteBook} className=" border-2 border-red-700">
        Delete Book With {id} ID
      </button>
    </div>
  );
};

export default DeleteBook;
