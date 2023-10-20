import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
const TableData = ({
  title,
  imgSrc,
  shortDescription,
  isbn,
  authors,
  publishedDate,
  pageCount,
}) => {
  return (
    <>
      {/* row 1 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className=" h-20 w-auto">
                <img src={imgSrc} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{title}</div>
              <div className="text-sm opacity-50">{`ISBN: ${isbn}`}</div>
            </div>
          </div>
        </td>
        <td>
          {authors ? (
            authors.toString().replace(/,/g, ", ")
          ) : (
            <div className="badge badge-primary">Missing</div>
          )}
          <br />
          <span className="badge badge-ghost badge-sm">
            Published: {format(parseISO(publishedDate), "MMMM d, yyyy")}
          </span>
        </td>
        <td>
          {pageCount ? (
            pageCount
          ) : (
            <div className="badge badge-primary">Missing</div>
          )}
        </td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </>
  );
};
export default TableData;
