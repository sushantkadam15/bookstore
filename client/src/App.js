import BooksTable from "./Components/BooksTable";
import NavBar from "./Components/NavBar";


const App = () => {
  return (
    <section className=" mx-auto max-w-7xl">
      <NavBar />
      <BooksTable />

    </section>
  );
};

export default App;
