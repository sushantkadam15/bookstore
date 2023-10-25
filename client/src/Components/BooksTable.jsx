import booksData from "../Seed Data/amazon.books.json";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BookOpen, BookPlus, BookType, BookX, RotateCw } from "lucide-react";
import { Frown } from "lucide-react";
import {
  tableHead,
  tabs,
  filterBooksBySearch,
  filterBooksByTab,
  formatDate,
} from "../Utility/bookViewFunctions";
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
  IconButton,
  Tooltip,
  Checkbox,
  Textarea,
} from "@material-tailwind/react";

/**
 * Represents a table component for displaying books.
 * @returns The BooksTable component.
 */
const BooksTable = () => {
  const [displayedBookData, setDisplayedBookData] = useState(booksData);
  const [isViewMoreOn, setIsViewMoreOn] = useState(false);
  const itemsPerPage = isViewMoreOn ? displayedBookData.length : 5;
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = Math.ceil(displayedBookData.length / itemsPerPage) || 1;
  const itemStartIndex = (currentPage - 1) * itemsPerPage;
  const itemEndIndex = itemStartIndex + itemsPerPage;
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editModeOnFor, setEditModeOnFor] = useState({
    id: null,
    key: null,
  });

  const handleEditModeToggle = (elementToActive, id, key) => {
    if (elementToActive === "input") {
      setEditModeOnFor({ ...editModeOnFor, id: id, key: key });
    } else {
      console.log("onl");
      setEditModeOnFor({ ...editModeOnFor, id: null, key: null });
    }
  };

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
            >
              <BookPlus />
            </Button>
            <Button
              className="flex items-center gap-3  bg-blue-gray-800"
              size="sm"
            >
              <BookType />
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
            >
              <RotateCw />
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                setIsViewMoreOn(!isViewMoreOn);
                setCurrentPage(1);
              }}
            >
              {isViewMoreOn ? "view less" : "view more"}
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
                    setSearchQuery("");
                    setSelectedTab(value);
                    filterBooksByTab(value, setDisplayedBookData, booksData);
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
                filterBooksBySearch(
                  booksData,
                  e.target.value,
                  setDisplayedBookData,
                  selectedTab,
                );
                setCurrentPage(1);
              }}
            />
          </div>
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
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body  */}
          <tbody>
            {displayedBookData.length !== 0 ? (
              displayedBookData
                .slice(itemStartIndex, itemEndIndex)
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
                    const isLast = index === displayedBookData.length - 1;
                    const authorsString =
                      authors && authors.toString().replace(",", ", ");

                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50 max-w-96";

                    return (
                      <tr key={index}>
                        <td>
                          <Checkbox
                            ripple={false}
                            className="h-6 w-6 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                          />
                        </td>

                        {/* Title and Authors  */}
                        <td className={" max-w-sm p-4"}>
                          <div className="flex items-center gap-3">
                            <Avatar src={thumbnailUrl} alt={title} size="xl" />
                            <div className="mx-2 flex w-8/12 flex-col">
                              {/* Title   */}
                              {editModeOnFor.id === _id &&
                              editModeOnFor.key === "title" ? (
                                <Input
                                  label="Title"
                                  value={title}
                                  onMouseLeave={() =>
                                    handleEditModeToggle("div")
                                  }
                                />
                              ) : (
                                <Typography
                                  variant="small"
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
                              {editModeOnFor.id === _id &&
                              editModeOnFor.key === "authors" ? (
                                <Input
                                  variant="small"
                                  label="Author"
                                  value={authorsString}
                                  onMouseOut={() => handleEditModeToggle("div")}
                                />
                              ) : (
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setEditModeOnFor({
                                      ...editModeOnFor,
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
                            {editModeOnFor.id === _id &&
                            editModeOnFor.key === "publishedDate" ? (
                              <Input
                                type="date"
                                variant="small"
                                label="Published Date"
                                value={publishedDate?.$date}
                                onMouseOut={() => handleEditModeToggle("div")}
                              />
                            ) : (
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="cursor-pointer font-normal"
                                onClick={() => {
                                  setEditModeOnFor({
                                    ...editModeOnFor,
                                    key: "publishedDate",
                                    id: _id,
                                  });
                                }}
                              >
                                {publishedDate?.$date ? (
                                  formatDate(publishedDate.$date)
                                ) : (
                                  <Chip
                                    variant="small"
                                    color="purple"
                                    value="Missing"
                                    className=" my-2 w-20 rounded-md text-center"
                                  />
                                )}
                              </Typography>
                            )}

                            <Typography
                              variant="small"
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
                          {editModeOnFor.id === _id &&
                          editModeOnFor.key === "shortDescription" ? (
                            <Textarea
                              variant="outlined"
                              label="Description"
                              value={shortDescription}
                              onMouseOut={() => handleEditModeToggle("div")}
                            />
                          ) : (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className={
                                shortDescription
                                  ? "line-clamp-1 w-96 cursor-pointer font-normal"
                                  : " line-clamp-1 w-96 cursor-pointer text-center text-sm font-normal text-cyan-800"
                              }
                              onClick={() => {
                                setEditModeOnFor({
                                  ...editModeOnFor,
                                  key: "shortDescription",
                                  id: _id,
                                });
                              }}
                            >
                              {shortDescription ? (
                                shortDescription
                              ) : (
                                <Chip
                                  variant="small"
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
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
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
