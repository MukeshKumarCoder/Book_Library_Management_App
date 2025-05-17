import React from "react";

const BookCard = ({ book, onAdd }) => {
  return (
    <div className="w-11/12 m-auto p-3 rounded-md max-w-xs shadow-xl bg-white">
      <div className="flex justify-center items-center gap-y-2 flex-col">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-50 rounded-md"
        />
        <h2 className="font-bold text-amber-500">Title: {book.title}</h2>
        <p className="text-amber-500">Author: {book.author}</p>
        <button
          onClick={() => onAdd(book._id)}
          className="border border-amber-500 bg-amber-600 py-2 px-3 rounded-md cursor-pointer text-white"
        >
          Add to my Books
        </button>
      </div>
    </div>
  );
};

export default BookCard;
