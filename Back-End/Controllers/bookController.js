const Book = require("../Models/Book");

// get All Books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch books. Please try again",
    });
  }
};
