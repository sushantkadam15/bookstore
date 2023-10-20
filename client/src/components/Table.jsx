import TableData from "./TableData";
import books from "../data/seedData";

const Table = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>Title</th>
          <th>Author</th>
          <th>Favorite Color</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <TableData
            id={book._id}
            key={book._id}
            title={book.title}
            imgSrc={book.thumbnailUrl}
            shortDescription={book.shortDescription}
            publishedDate={book.publishedDate.$date}
            isbn={book.isbn}
            authors={book.authors}
            pageCount={book.pageCount}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Author</th>
          <th>Favorite Color</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
