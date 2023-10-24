// bookFunctions.js
import Fuse from "fuse.js";

export const tableHead = ["", "Title", "Function", "Status", "Description", ""];
export const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Published",
    value: "published",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

// export class Books {
//   constructor(booksData) {
//     this.books = booksData;
//   }
//   /**
//    * Get all the books without any sorting or filtering.
//    * @returns {Array} An array of all the books.
//    */
//   getBooks() {
//     return this.books;
//   }

//   /**
//    * Filter the books to include only those with "PUBLISH" status.
//    * @returns {Array} An array of published books.
//    */
//   filterPublished() {
//     const publishedBooks = this.books.filter(
//       (book) => book.status === "PUBLISH",
//     );
//     return publishedBooks;
//   }

//   /**
//    * Filter the books to include those with an unknown or non-"PUBLISH" status.
//    * @returns {Array} An array of books with unknown or non-"PUBLISH" status.
//    */
//   filterByUnknownPublishedStatus() {
//     const booksByUnknownPublishedStatus = this.books.filter(
//       (book) => !book.hasOwnProperty("status") || book.status !== "PUBLISH",
//     );
//     return booksByUnknownPublishedStatus;
//   }

//   /**
//    * Sort the books by title in ascending order.
//    * @returns {Array} An array of books sorted by title in ascending order.
//    */
//   sortByTitleAscending() {
//     const booksSortedByTitleAscending = this.books
//       .slice()
//       .sort((bookA, bookB) => bookA.title.localeCompare(bookB.title));
//     return booksSortedByTitleAscending;
//   }

//   /**
//    * Sort the books by title in descending order.
//    * @returns {Array} An array of books sorted by title in descending order.
//    */
//   sortByTitleDescending() {
//     const booksSortedByTitleDescending = this.books
//       .slice()
//       .sort((bookA, bookB) => bookB.title.localeCompare(bookA.title));
//     return booksSortedByTitleDescending;
//   }

//   /**
//    * Sort the books by published date in ascending order.
//    * @returns {Array} An array of books sorted by published date in ascending order.
//    */
//   sortByPublishedDateAscending() {
//     const booksSortedByPublishedDateAscending = this.books
//       .slice()
//       .sort(
//         (bookA, bookB) =>
//           new Date(bookA.publishedDate) - new Date(bookB.publishedDate),
//       );
//     return booksSortedByPublishedDateAscending;
//   }

//   /**
//    * Sort the books by published date in descending order.
//    * @returns {Array} An array of books sorted by published date in descending order.
//    */
//   sortByPublishedDateDescending() {
//     const booksSortedByPublishedDateDescending = this.books
//       .slice()
//       .sort(
//         (bookA, bookB) =>
//           new Date(bookB.publishedDate) - new Date(bookA.publishedDate),
//       );
//     return booksSortedByPublishedDateDescending;
//   }
// }

export const filterBooksBySearch = (
  booksData,
  searchQuery,
  setDisplayedBookData,
  pageNumbers,
  setPageNumbers,
  paginationSettings,
) => {
  const fuseOptions = {
    keys: ["title"],
  };

  if (searchQuery) {
    const fuse = new Fuse(booksData, fuseOptions);
    const searchResult = fuse.search(searchQuery);
    if (searchResult.length !== 0) {
      const filteredBooks = searchResult.map((result) => result.item);
      setDisplayedBookData(filteredBooks);
      setPageNumbers({
        ...pageNumbers,
        start: 1,
        end: Math.ceil(
          filteredBooks.length / paginationSettings.maxItemsDisplayed,
        ),
      });
    } else {
      // When No results found
      setDisplayedBookData([]);

      setPageNumbers({
        ...pageNumbers,
        start: 0,
        end: 0,
      });
    }
  } else {
    // If Search query is "" includes backspaces
    setDisplayedBookData(booksData);
    setPageNumbers({
      ...pageNumbers,
      start: 1,
      end: Math.ceil(booksData.length / paginationSettings.maxItemsDisplayed),
    });
  }
};

export const filterBooksByTab = (
  value,
  pageNumbers,
  setPageNumbers,
  setDisplayedBookData,
  booksData,
  paginationSettings,
) => {
  console.log("🚀 ~ file: bookViewFunctions.js:157 ~ value:", value);
  if (value === "all") {
    setDisplayedBookData(booksData);
    setPageNumbers({
      ...pageNumbers,
      start: 1,
      end: Math.ceil(booksData.length / paginationSettings.maxItemsDisplayed),
    });
  } else if (value === "published") {
    const publishedBooks = booksData.filter(
      (book) => book.status === "PUBLISH",
    );
    setDisplayedBookData(publishedBooks);
    setPageNumbers({
      ...pageNumbers,
      start: 1,
      end: Math.ceil(
        publishedBooks.length / paginationSettings.maxItemsDisplayed,
      ),
    });
  } else if (value === "unknown") {
    const booksWithUnknownPublishedDate = booksData.filter(
      (book) => !book.hasOwnProperty("status") || book.status !== "PUBLISH",
    );
    setDisplayedBookData(booksWithUnknownPublishedDate);

    setPageNumbers({
      ...pageNumbers,
      start: 1,
      end: Math.ceil(
        booksWithUnknownPublishedDate.length /
          paginationSettings.maxItemsDisplayed,
      ),
    });
  }
};

export const updateItemsToShow = (itemsToShow, displayBooks) => {
  if (itemsToShow.end === displayBooks.length) {
    return {
      start: 1,
      end: displayBooks.length,
    };
  } else {
    return {
      start: 1,
      end: 5,
    };
  }
};

export const handlePageChange = (
  changeType,
  paginationSettings,
  setPaginationSettings,
  pageNumbers,
  setPageNumbers,
) => {
  if (changeType === "next") {
    setPaginationSettings({
      ...paginationSettings,
      startIndex:
        paginationSettings.startIndex + paginationSettings.maxItemsDisplayed,
      endIndex:
        paginationSettings.endIndex + paginationSettings.maxItemsDisplayed,
    });
    setPageNumbers({ ...pageNumbers, start: pageNumbers.start + 1 });
  } else if (changeType === "previous") {
    setPaginationSettings({
      ...paginationSettings,
      startIndex:
        paginationSettings.startIndex - paginationSettings.maxItemsDisplayed,
      endIndex:
        paginationSettings.endIndex - paginationSettings.maxItemsDisplayed,
    });
    setPageNumbers({ ...pageNumbers, start: pageNumbers.start - 1 });
  }
};
