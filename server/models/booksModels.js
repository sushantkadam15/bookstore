// Books Model
const { model, Schema } = require("mongoose");

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: String,
  pageCount: Number,
  publishedDate: Date,
  thumbnailUrl: String,
  shortDescription: String,
  status: String,
  authors: {
    type: [String],
    required: true,
  },
  categories: [String],
  timestamps: true,
});

const booksModel = model("books", booksSchema);
module.exports = booksModel;