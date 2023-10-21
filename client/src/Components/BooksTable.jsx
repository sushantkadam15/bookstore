import booksData from "../Seed Data/amazon.books.json";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BookPlus } from "lucide-react";
import { Frown } from "lucide-react";
import {
  tableHead,
  tabs,
  filterBooksBySearch,
  filterBooksByTab,
  updateItemsToShow,
  handlePageChange,
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
} from "@material-tailwind/react";

// ------------ Components Starts here -----------------

const BooksTable = () => {
  const [displayedBookData, setDisplayedBookData] = useState(booksData);
  const [paginationSettings, setPaginationSettings] = useState({
    start: 0,
    end: 5,
    max: 5,
  });
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    last: Math.ceil(displayedBookData.length / paginationSettings.max),
  });
  const [viewMode, setViewMode] = useState("view less");

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
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                setViewMode((prevViewMode) =>
                  prevViewMode === "view less" ? "view more" : "view less",
                );
                filterBooksByTab(
                  displayedBookData,
                  viewMode,
                  paginationSettings,
                  setPaginationSettings,
                  pageInfo,
                  setPageInfo,
                );
              }}
            >
              {viewMode === "view less" ? "view more" : "view less"}
            </Button>
            <Button
              className="flex items-center gap-3  bg-blue-gray-800"
              size="sm"
            >
              <BookPlus />
              Add Books
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {tabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => filterBooksByTab(value)}
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
              onChange={(e) =>
                filterBooksBySearch(
                  booksData,
                  e.target.value,
                  setDisplayedBookData,
                  pageInfo,
                  setPageInfo,
                  paginationSettings.max,
                )
              }
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
                    {index !== tableHead.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedBookData.length !== 0 ? (
              displayedBookData
                .slice(paginationSettings.start, paginationSettings.end)
                .map(
                  (
                    {
                      _id,
                      title,
                      isbn,
                      paginationSettings,
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
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={thumbnailUrl} alt={title} size="xl" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {title}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="my-1 line-clamp-1 w-96 font-normal opacity-70"
                              >
                                {authorsString}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {title}
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
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="line-clamp-1 w-96 font-normal"
                          >
                            {shortDescription}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
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
          Page {pageInfo.current} of {pageInfo.last}
        </Typography>
        <div className="flex gap-2">
          <Button
            disabled={pageInfo.current === 1}
            variant="outlined"
            size="sm"
            onClick={handlePageChange}
          >
            Previous
          </Button>
          <Button
            disabled={pageInfo.current === pageInfo.total}
            variant="outlined"
            size="sm"
            onClick={handlePageChange}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BooksTable;
