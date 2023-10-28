const booksModel = require("../models/booksModels");
const booksJsonData = require("../data/amazon.books.json");

exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await booksModel.find({});
    res.status(200).json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching books" });
  }
};

exports.addNewBook = (req, res) => {
  null;
};

exports.updateBook = async (req, res) => {
  const { id, ...update } = req.body;
  try {
    const updatedBook = await booksModel.findByIdAndUpdate(id, update, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteBooks = (req, res) => {
  null;
};

exports.resetBooksDB = async (req, res) => {
  try {
    // Delete all existing books
    await booksModel.deleteMany({});

    // Map the JSON data to the schema format
    const booksToPost = booksJsonData.map((book) => ({
      title: book.title,
      isbn: book.isbn,
      pageCount: book.pageCount,
      publishedDate: book.publishedDate?.["$date"],
      thumbnailUrl: book.thumbnailUrl,
      shortDescription: book.shortDescription,
      status: book.status,
      longDescription: book.longDescription,
      authors: book.authors,
      categories: book.categories,
    }));

    const createdBooks = await booksModel.create(booksToPost);

    res
      .status(201)
      .json({ message: "Books added successfully", books: createdBooks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the database" });
  }
};
