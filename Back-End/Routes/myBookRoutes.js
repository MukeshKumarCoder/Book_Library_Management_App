const express = require("express");
const router = express.Router();
const myBook = require("../Controllers/myBookController");
const protect = require("../middleware/auth");

router.get("/", protect, myBook.getUserBooks);
router.post("/:bookId", protect, myBook.addBook);
router.patch("/:bookId/status", protect, myBook.updateStatus);
router.patch("/:bookId/rating", protect, myBook.updateRating);

module.exports = router;
