import Fuse from "fuse.js";

//  Table headers for the book table.
export const tableHead = ["", "Title", "Function", "Status", "Description", ""];

//  Tabs for filtering books.
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

const dataBySelectedTab = (booksData, selectedTab) => {
  if (selectedTab === "all") {
    console.log(
      "🚀 ~ file: bookViewFunctions.js:24 ~ dataBySelectedTab ~ selectedTab:",
      selectedTab,
    );
    return booksData;
  } else if (selectedTab === "published") {
    const publishedBooks = booksData.filter(
      (book) => book.status === "PUBLISH",
    );
    return publishedBooks;
  } else if (selectedTab === "unknown") {
    const booksWithUnknownPublishedDate = booksData.filter(
      (book) => !book.hasOwnProperty("status") || book.status !== "PUBLISH",
    );
    return booksWithUnknownPublishedDate;
  }
};

// Function to filter books based on a search query.
export const filterBooksBySearch = (
  booksData,
  searchQuery,
  setDisplayedBookData,
  selectedTab,
) => {
  const bookDataByTabSelected = dataBySelectedTab(booksData, selectedTab);

  // Configure search options for fuzzy search.
  const fuseOptions = {
    keys: ["title"],
  };

  if (searchQuery) {
    const fuse = new Fuse(bookDataByTabSelected, fuseOptions);

    // Perform a search and update displayed books based on the search results.
    const searchResult = fuse.search(searchQuery);
    if (searchResult.length !== 0) {
      const filteredBooks = searchResult.map((result) => result.item);
      setDisplayedBookData(filteredBooks);
    } else {
      // When no results are found, clear the displayed books.
      setDisplayedBookData([]);
    }
  } else {
    // If the search query is empty (or includes only spaces), show all books.
    setDisplayedBookData(bookDataByTabSelected);
  }
};

// Function to filter books based on the selected tab.
export const filterBooksByTab = (value, setDisplayedBookData, booksData) => {
  if (value === "all") {
    setDisplayedBookData(booksData);
  } else if (value === "published") {
    const publishedBooks = booksData.filter(
      (book) => book.status === "PUBLISH",
    );
    setDisplayedBookData(publishedBooks);
  } else if (value === "unknown") {
    const booksWithUnknownPublishedDate = booksData.filter(
      (book) => !book.hasOwnProperty("status") || book.status !== "PUBLISH",
    );
    setDisplayedBookData(booksWithUnknownPublishedDate);
  }
};

//sortByTitleAscending() {
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
// );
//     return booksSortedByPublishedDateAscending;
//   }
/**
//    * Sort the books by published date in descending order.

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
