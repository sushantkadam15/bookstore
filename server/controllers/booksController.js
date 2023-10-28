const express = require("express");
const router = express.Router();
const booksService = require("../services/booksServices");

router
  .route("/")
  .post(booksService.addNewBook)
  .get(booksService.getAllBooks)
  .put(booksService.updateBook)
  .delete(booksService.deleteBooks);

router.route("/reset").put(booksService.resetBooksDB);

module.exports = router;
