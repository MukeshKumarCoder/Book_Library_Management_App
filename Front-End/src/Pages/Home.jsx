import React, { useEffect, useState } from "react";
import api from "../api";
import BookCard from "../Components/BookCard";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/books")
      .then((res) => {
        setBooks(res.data.books);
        setLoading(false);
      })
      .catch(() => toast.error("Failed to load books"));
  }, []);

  const addBook = async (bookId) => {
    if (!token) {
      toast.error("Login first to add book");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    try {
      await api.post(`/mybooks/${bookId}`);
      toast.success("Book added to your Collection");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding the book"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-40">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-4 gap-6 p-6 bg-amber-100">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book} onAdd={addBook} />
          ))
        ) : (
          <p className="font-bold text-3xl text-center">No books available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
