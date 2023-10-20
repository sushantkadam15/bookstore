import Searchbar from "../components/Searchbar";
import Table from "../components/Table";

const TableView = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className=" w-full self-start">
        <Searchbar />
      </div>
      <Table />
    </div>
  );
};
export default TableView;
