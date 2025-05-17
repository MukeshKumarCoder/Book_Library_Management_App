const MyBook = require("../Models/MyBook");

// get User's Book
exports.getUserBooks = async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user._id }).populate(
      "bookId"
    );
    return res.status(200).json({
      success: true,
      myBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user books. Please try again",
    });
  }
};

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const existing = await MyBook.findOne({ userId: req.user._id, bookId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Book is already added",
      });
    }

    const myBook = await MyBook.create({ userId: req.user._id, bookId });
    return res.status(201).json({
      success: true,
      myBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add book. Please try again",
    });
  }
};

// update Book Status
exports.updateStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;

    const updated = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Book not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status. Please try again",
    });
  }
};

// update Book Rating
exports.updateRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;

    const updated = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId },
      { rating },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Book not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update rating. Please try again",
    });
  }
};
