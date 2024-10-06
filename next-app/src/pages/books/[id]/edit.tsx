import {
  fetchBookById,
  selectBookById,
  updateBook,
} from "@/toolkit/slices/booksSlice";
import { AppDispatch, RootState } from "@/toolkit/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditBook: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const book = useSelector((state: RootState) =>
    selectBookById(state, id as string)
  );

  const [title, setTitle] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");

  const handleUpdate = async () => {
    await dispatch(
      updateBook({
        id: id as string,
        updatedData: { title, author, published_year: publishedYear },
      })
    );
    router.push(`/books/${id}`);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id as string));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setPublishedYear(book.published_year);
      setAuthor(book.author);
    }
  }, [book]);

  if (!book) return <p>Loading....</p>;

  return (
    <div className="flex justify-center flex-col mt-7">
      <div className="input-group mb-5 w-full text-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border-2 border-emerald-800"
        />
      </div>
      <div className="input-group mb-5 w-full text-center">
        <input
          value={publishedYear}
          onChange={(e) => setPublishedYear(Number(e.target.value))}
          type="number"
          className="border-2 border-emerald-800"
        />
      </div>
      <div className="input-group mb-5 w-full text-center">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          className="border-2 border-emerald-800"
        />
      </div>
      <button onClick={handleUpdate}>SUBMIT</button>
    </div>
  );
};

export default EditBook;
