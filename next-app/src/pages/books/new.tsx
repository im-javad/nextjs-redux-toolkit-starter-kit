import { createBook } from "@/toolkit/slices/booksSlice";
import { AppDispatch } from "@/toolkit/store";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const NewBook: React.FC = () => {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");

  const handleSubmitNewBook = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      createBook({ title, published_year: publishedYear, author })
    );
    router.push("/books");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create a New Book</h2>
        <form onSubmit={handleSubmitNewBook}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publishedYear"
              className="block text-sm font-medium text-gray-700"
            >
              Published Year
            </label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={publishedYear}
              onChange={(e) => setPublishedYear(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="authorName"
              className="block text-sm font-medium text-gray-700"
            >
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Create Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBook;
