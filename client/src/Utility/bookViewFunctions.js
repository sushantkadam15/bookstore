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

export const filterBooksByTab = (
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
  //   if (tabValue === "all") {
  //     return booksData;
  //   } else if (tabValue === "published") {
  //     return booksData.filter((book) => book.status === "PUBLISH");
  //   } else if (tabValue === "unknown") {
  //     return booksData.filter(
  //       (book) => !book.status || book.status !== "PUBLISH",
  //     );
  //   }
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
