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

export class Books {
  constructor(booksData) {
    this.books = booksData;
  }
  /**
   * Get all the books without any sorting or filtering.
   * @returns {Array} An array of all the books.
   */
  getBooks() {
    return this.books;
  }

  /**
   * Filter the books to include only those with "PUBLISH" status.
   * @returns {Array} An array of published books.
   */
  filterPublished() {
    const publishedBooks = this.books.filter(
      (book) => book.status === "PUBLISH",
    );
    return publishedBooks;
  }

  /**
   * Filter the books to include those with an unknown or non-"PUBLISH" status.
   * @returns {Array} An array of books with unknown or non-"PUBLISH" status.
   */
  filterByUnknownPublishedStatus() {
    const booksByUnknownPublishedStatus = this.books.filter(
      (book) => !book.hasOwnProperty("status") || book.status !== "PUBLISH",
    );
    return booksByUnknownPublishedStatus;
  }

  /**
   * Sort the books by title in ascending order.
   * @returns {Array} An array of books sorted by title in ascending order.
   */
  sortByTitleAscending() {
    const booksSortedByTitleAscending = this.books
      .slice()
      .sort((bookA, bookB) => bookA.title.localeCompare(bookB.title));
    return booksSortedByTitleAscending;
  }

  /**
   * Sort the books by title in descending order.
   * @returns {Array} An array of books sorted by title in descending order.
   */
  sortByTitleDescending() {
    const booksSortedByTitleDescending = this.books
      .slice()
      .sort((bookA, bookB) => bookB.title.localeCompare(bookA.title));
    return booksSortedByTitleDescending;
  }

  /**
   * Sort the books by published date in ascending order.
   * @returns {Array} An array of books sorted by published date in ascending order.
   */
  sortByPublishedDateAscending() {
    const booksSortedByPublishedDateAscending = this.books
      .slice()
      .sort(
        (bookA, bookB) =>
          new Date(bookA.publishedDate) - new Date(bookB.publishedDate),
      );
    return booksSortedByPublishedDateAscending;
  }

  /**
   * Sort the books by published date in descending order.
   * @returns {Array} An array of books sorted by published date in descending order.
   */
  sortByPublishedDateDescending() {
    const booksSortedByPublishedDateDescending = this.books
      .slice()
      .sort(
        (bookA, bookB) =>
          new Date(bookB.publishedDate) - new Date(bookA.publishedDate),
      );
    return booksSortedByPublishedDateDescending;
  }
}

export const filterBooksBySearch = (
  booksData,
  searchQuery,
  setDisplayedBookData,
  pageInfo,
  setPageInfo,
  paginationSettingsMax,
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
      setPageInfo({
        ...pageInfo,
        current: 1,
        last: Math.ceil(filteredBooks.length / paginationSettingsMax),
      });
    } else {
      // When No results found
      setDisplayedBookData([]);

      setPageInfo({
        ...pageInfo,
        current: 0,
        last: 0,
      });
    }
  } else {
    // If Search query is "" includes backspaces
    setDisplayedBookData(booksData);
    setPageInfo({
      ...pageInfo,
      current: 1,
      last: Math.ceil(booksData.length / paginationSettingsMax),
    });
  }
};

export const toggleViewMode = (
  booksData,
  tabValue,
  paginationSettings,
  setPaginationSettings,
  pageInfo,
  setPageInfo,
) => {
  if (tabValue === "view less") {
    setPaginationSettings({
      ...paginationSettings,
      start: 0,
      end: paginationSettings.max,
    });
    setPageInfo({
      ...pageInfo,
      current: 1,
      last: Math.ceil(booksData.length / paginationSettings.max),
    });
  } else if (tabValue === "view more") {
    setPaginationSettings({
      ...paginationSettings,
      start: 0,
      end: booksData.length,
    });
    setPageInfo({
      ...pageInfo,
      current: 1,
      last: 1,
    });
  }
};

export const filterBooksByTab = (
  value,
  pageInfo,
  setPageInfo,
  displayedBookData,
  setDisplayedBookData,
  booksData,
  paginationSettings,
) => {
  if (value === "all") {
    setDisplayedBookData(booksData);
    setPageInfo({
      ...pageInfo,
      start: 1,
      last: Math.ceil(booksData.length / paginationSettings.max),
    });
  } else if (value === "published") {
    const publishedBooks = booksData.filter(
      (book) => book.status === "PUBLISH",
    );
    setDisplayedBookData(publishedBooks);
    setPageInfo({
      ...pageInfo,
      start: 1,
      last: Math.ceil(publishedBooks.length / paginationSettings.max),
    });
  } else if (value === "unknown") {
    const booksWithUnknownPublishedDate = booksData.filter(
      (book) => !book.hasOwnProperty("status") || book.status !== "PUBLISH",
    );
    setDisplayedBookData(booksWithUnknownPublishedDate);
    setPageInfo({
      ...pageInfo,
      start: 1,
      last: Math.ceil(
        booksWithUnknownPublishedDate.length / paginationSettings.max,
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

export const handlePageChange = (changeType) => {
  return null;
};
