// import booksData from "../Seed Data/amazon.books.json";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BookPlus, BookX, RotateCw } from "lucide-react";
import { Frown } from "lucide-react";
import axios from "axios";
import Fuse from "fuse.js";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Checkbox,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import NewBookDialog from "./NewBookDialog";

/**
 * Represents a table component for displaying books.
 * @returns The BooksTable component.
 */
const BooksTable = () => {
  // State variables
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [isViewMoreEnabled, setIsViewMoreEnabled] = useState(false);

  // Pagination variables
  const itemsPerPage = isViewMoreEnabled ? displayedBooks.length : 5;
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = Math.ceil(displayedBooks.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Tab and search variables
  const [selectedTab, setSelectedTab] = useState("all");
  const tableHead = ["", "Title", "Date", "Status", "Description"];
  const tabs = [
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
  const [searchQuery, setSearchQuery] = useState("");

  // Edit mode and textarea height
  const [editMode, setEditMode] = useState({
    id: null,
    key: null,
  });


  // Base URL for data fetching
  const BASE_URL = "http://localhost:3500/";

  // Function to fetch book data from the specified BASE_URL
  async function fetchBooks() {
    const response = await axios.get(`${BASE_URL}books`).then((res) => res.data);

    // Update the books and displayed books
    setBooks(response);
    setDisplayedBooks(response);
    setIsLoading(false);
  }

  // Memoized filters
  const publishedBooks = useMemo(() => {
    const published = books.filter((book) => book.status === "PUBLISH");
    return published;
  }, [books]);

  const booksWithUnknownPublishedDate = useMemo(() => {
    const unknownPublishedDate = books.filter(
      (book) => !book.hasOwnProperty("status") || book.status !== "PUBLISH"
    );
    return unknownPublishedDate;
  }, [books]);

  // Function to handle tab changes and update displayed books
  const handleTabChange = (value) => {
    if (value === "published") {
      setDisplayedBooks(publishedBooks);
    } else if (value === "unknown") {
      setDisplayedBooks(booksWithUnknownPublishedDate);
    } else {
      setDisplayedBooks(books);
    }
  };

  // Trigger the data fetching when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to perform a search on displayed books
  const handleSearch = useCallback((searchQuery) => {
    let filteredBooks;
    if (selectedTab === "published") {
      filteredBooks = publishedBooks;
    } else if (selectedTab === "unknown") {
      filteredBooks = booksWithUnknownPublishedDate;
    } else {
      filteredBooks = books;
    }
    if (searchQuery === "") {
      setDisplayedBooks(filteredBooks);
      return;
    }
    const searchOptions = {
      keys: ["title"],
      threshold: 0.3,
    };

    const fuse = new Fuse(filteredBooks, searchOptions);
    let searchResult = fuse.search(searchQuery);
    searchResult = searchResult.map((foundResults) => foundResults.item);
    setDisplayedBooks(searchResult);
  }, [selectedTab, publishedBooks, booksWithUnknownPublishedDate, books]);

  // Function to toggle edit mode for a specific element
  const handleEditModeToggle = (elementToActivate, id, key) => {
    if (elementToActivate === "input") {
      setEditMode({ ...editMode, id: id, key: key });
    } else {
      setEditMode({ ...editMode, id: null, key: null });
    }
  };

  // Function to update book information
  const handleUpdateBookInfo = async (bookObjectId, key, newValue) => {
    // Use functional state update to avoid mutating state
    setDisplayedBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book._id === bookObjectId) {
          return { ...book, [key]: newValue };
        }
        return book;
      })
    );

    await axios
      .put(`${BASE_URL}books`, { [key]: newValue, id: bookObjectId })
      .then((res) => true)
      .catch((err) => console.log(err));
  };

  
    // Format a date for display and input
  const formatDate = (inputDate) => {
  let displayDateFormat
  let inputDateFormat

    if (inputDate) {
      const date = new Date(inputDate);

      // Format the date for display as "October 9, 2023"
      displayDateFormat = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);

      // Format the date for input as "2023-10-14"
      inputDateFormat = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;

    }


    // Set the max date for user input to today
    const today = new Date();
    const maxDateFormat = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;

    return {
      displayDateFormat,
      inputDateFormat,
      maxDateFormat,
    };
  };

  // Function to convert user input to backend date format
  function convertUserInputToBackendDate(userInput) {
    const inputDate = new Date(userInput);
    const backendFormat = inputDate.toISOString();
    return backendFormat;
  }

  // Function to reset data
  const handleReset = async () => {
    try {
      setIsLoading(true);
      setDisplayedBooks([]);
      const response = await axios.put(`${BASE_URL}books/reset`);
      setDisplayedBooks(response.data.books);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const authorsStringToArray = (e) => {
    const newValueString = e.target.value;
    // Splits the string by ',' with optional spaces and converts it into an array
    const newValueArray = newValueString.split(/\s*,\s*|,/);
    return newValueArray
  }

  const [openNewBookDialog, setOpenNewBookDialog] = useState(false);

  const handleOpen = () => setOpenNewBookDialog(!openNewBookDialog);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Books Rack
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all books
            </Typography>
          </div>

          {/* Action Buttons  */}
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3  bg-blue-gray-800"
              size="sm"
              onClick={handleOpen}
            >
              <BookPlus />
            </Button>
            <Button
              className="flex items-center gap-3  bg-blue-gray-800"
              size="sm"
            >
              <BookX />
            </Button>
            <Button
              className="flex items-center gap-3  bg-blue-gray-800"
              size="sm"
              onClick={handleReset}
            >
              <RotateCw />
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                setIsViewMoreEnabled(!isViewMoreEnabled);
                setCurrentPage(1);
              }}
            >
              {isViewMoreEnabled ? "view less" : "view more"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={selectedTab} className="w-full md:w-max">
            <TabsHeader>
              {tabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    setSelectedTab(value)
                    handleTabChange(value)
                    setCurrentPage(1);
                  }}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value)
                setCurrentPage(1);
              }}
            />
          </div>
          <NewBookDialog openNewBookDialog={openNewBookDialog} handleOpen={handleOpen} authorsStringToArray={authorsStringToArray} convertUserInputToBackendDate={convertUserInputToBackendDate} BASE_URL={BASE_URL}  setDisplayedBooks={setDisplayedBooks}/>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Spinner is displayed until the data loads  */}
            {isLoading ? (
              <tr className=" h-96">
                <td colSpan={5} className=" text-center">
                  <Spinner className=" h-32 w-32 mx-auto" />
                </td>
              </tr>
            ) : (
              <>
                {/* Table Body  */}
                {displayedBooks.length !== 0 ? (
                  displayedBooks
                    .slice(startIndex, endIndex)
                    .map(
                      (
                        {
                          _id,
                          title,
                          isbn,
                          publishedDate,
                          thumbnailUrl,
                          shortDescription,
                          status,
                          authors,
                          categories,
                        },
                        index,
                      ) => {
                        const isLast = index === displayedBooks.length - 1;

                        const authorsString =
                          authors && authors.join(", ");

                        const { displayDateFormat, inputDateFormat, maxDateFormat } = formatDate(publishedDate)

                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50 max-w-96";

                        return (
                          <tr key={_id} className=" min-h-max">
                            <td>
                              <Checkbox
                                ripple={false}
                                className="h-6 w-6 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                              />
                            </td>

                            {/* Title and Authors  */}
                            <td className={" max-w-sm p-4"}>
                              <div className="flex items-center gap-3">
                                <Avatar src={thumbnailUrl} alt={title} size="xl" loading="lazy" />
                                <div className="mx-2 flex w-8/12 flex-col">
                                  {/* Title   */}
                                  {editMode.id === _id &&
                                    editMode.key === "title" ? (
                                    <Input
                                      label="Title"
                                      value={title}
                                      onMouseLeave={() =>
                                        handleEditModeToggle("div")
                                      }
                                      onChange={(e) => handleUpdateBookInfo(_id, "title", e.target.value)}

                                    />
                                  ) : (
                                    <Typography
                                      color="blue-gray"
                                      className="cursor-pointer font-normal"
                                      onClick={() =>
                                        handleEditModeToggle("input", _id, "title")
                                      }
                                    >
                                      {title}
                                    </Typography>
                                  )}

                                  {/* Authors  */}
                                  {editMode.id === _id &&
                                    editMode.key === "authors" ? (
                                    <Input
                                      label="Author"
                                      value={authorsString}
                                      onMouseOut={() => handleEditModeToggle("div")}
                                      onChange={(e) => {
                                        const newAuthorsArray = authorsStringToArray(e)
                                        handleUpdateBookInfo(_id, "authors", newAuthorsArray)
                                      }}

                                    />
                                  ) : (
                                    <Typography
                                      color="blue-gray"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setEditMode({
                                          ...editMode,
                                          key: "authors",
                                          id: _id,
                                        });
                                      }}
                                    >
                                      {authorsString}
                                    </Typography>
                                  )}
                                </div>
                              </div>

                              {/* Published Date and ISBN  */}
                            </td>
                            <td className=" w-72 p-4">
                              <div className="flex flex-col">
                                {editMode.id === _id &&
                                  editMode.key === "publishedDate" ? (
                                  <Input
                                    type="date"
                                    label="Published Date"
                                    max={maxDateFormat}
                                    value={inputDateFormat}
                                    onMouseOut={() => handleEditModeToggle("div")}
                                    onChange={(e) => {
                                      const formattedDate = convertUserInputToBackendDate(e.target.value)
                                      handleUpdateBookInfo(_id, "publishedDate", formattedDate)

                                    }}
                                  />
                                ) : (
                                  <Typography
                                    color="blue-gray"
                                    className="cursor-pointer font-normal"
                                    onClick={() => {
                                      setEditMode({
                                        ...editMode,
                                        key: "publishedDate",
                                        id: _id,
                                      });
                                    }}
                                  >
                                    {publishedDate ? (
                                      displayDateFormat
                                    ) : (
                                      <Chip
                                        color="purple"
                                        value="Missing"
                                        className=" my-2 w-20 rounded-md text-center"
                                      />
                                    )}
                                  </Typography>
                                )}

                                <Typography
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {`ISBN: ${isbn}`}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  value={
                                    status === "PUBLISH" ? "Published" : "Unknown"
                                  }
                                  color={
                                    status === "PUBLISH" ? "green" : "blue-gray"
                                  }
                                />
                              </div>
                            </td>

                            {/* Short Description  */}
                            <td className={classes}>
                              {editMode.id === _id &&
                                editMode.key === "shortDescription" ? (
                                <Textarea
                                  variant="outlined"
                                  label="Description"
                                  className=" h-auto"
                                  value={shortDescription}
                                  onMouseOut={() => handleEditModeToggle("div")}
                                  onChange={(e) => {
                                    handleUpdateBookInfo(_id, "shortDescription", e.target.value)
                                  }}
                                />
                              ) : (
                                <Typography
                                  color="blue-gray"
                                  className={
                                    shortDescription
                                      ? "line-clamp-1 w-96 cursor-pointer font-normal"
                                      : " line-clamp-1 w-96 cursor-pointer text-center text-sm font-normal text-cyan-800"
                                  }
                                  onClick={() => {
                                    setEditMode({
                                      ...editMode,
                                      key: "shortDescription",
                                      id: _id,
                                    });
                                  }}
                                >
                                  {shortDescription ? (
                                    shortDescription
                                  ) : (
                                    <Chip
                                      color="purple"
                                      value="Missing"
                                      className=" m-2 mx-auto w-20 rounded-md text-center"
                                    />
                                  )}
                                </Typography>
                              )}
                            </td>
                          </tr>
                        );
                      },
                    )
                ) : (
                  <tr className=" h-20 ">
                    <td colSpan={6} className=" my-auto text-center text-4xl">
                      No Match Found{" "}
                      <span className="inline-block">
                        {" "}
                        <Frown size={35} />
                      </span>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography color="blue-gray" className="font-normal">
          Page {currentPage} of {lastPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            disabled={currentPage === 1}
            variant="outlined"
            size="sm"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={currentPage === lastPage}
            variant="outlined"
            size="sm"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BooksTable;
