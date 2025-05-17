import React, { useEffect, useState } from "react";
import api from "../api";

const MyBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/mybooks");
      // console.log("API Response:", res.data.myBooks);
      setBooks(res.data.myBooks);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    await api.patch(`/mybooks/${id}/status`, { status });
    location.reload();
    // fetchBooks();
  };

  const handleRatingChange = async (id, rating) => {
    await api.patch(`/mybooks/${id}/rating`, { rating });
    location.reload();
    // fetchBooks();
  };

  return (
    <div className="w-full bg-amber-100">
      <div className="w-11/12 m-auto flex gap-3 p-4 flex-wrap">
        {books.map(({ bookId, status, rating }) => (
          <div
            key={bookId._id}
            className="flex justify-center items-center gap-y-2 flex-col p-3 rounded-md bg-white"
          >
            <img
              src={bookId.coverImage}
              alt={bookId.title}
              className="w-50 rounded-md"
            />
            <h2 className="font-bold text-amber-500">Title: {bookId.title}</h2>
            <p className="text-amber-500">Author: {bookId.author}</p>

            <div className="flex justify-center items-center gap-x-3 mt-2">
              <label htmlFor="status" className="font-bold text-amber-500">
                Status:
              </label>
              <select
                value={status}
                id="status"
                name="status"
                onChange={(e) => handleStatusChange(bookId._id, e.target.value)}
                className="w-full p-2 border border-amber-500 text-amber-500 rounded"
              >
                <option>Want to Read</option>
                <option>Currently Reading</option>
                <option>Read</option>
              </select>
            </div>

            <div className="flex justify-center items-center gap-x-3 mt-2">
              <label htmlFor="rating" className="font-bold text-amber-500">
                Rating :
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min={0}
                max={5}
                value={rating}
                onChange={(e) => handleRatingChange(bookId._id, e.target.value)}
                className="ml-2 w-16 text-amber-500 font-bold border py-1 px-3 rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBook;
