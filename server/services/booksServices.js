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

exports.addNewBook = async (req, res) => {
  try {
    const bookData = req.body;
    
    // Check if a book with the same data already exists
    const existingBook = await booksModel.findOne({ title: bookData.title });

    if (existingBook) {
      return res.status(400).json({ error: 'A book with the same name already exists.' });
    }

    // If no existing book found, create and save the new book
    const newBook = new booksModel(bookData);
    const savedBook = await newBook.save();
    
    res.status(200).json(savedBook);

  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create a new book.' });
  }
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
