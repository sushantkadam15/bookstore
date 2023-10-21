import BooksTable from "./Components/BooksTable";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <section className="mx-auto max-w-screen-2xl">
      <NavBar />
      <BooksTable />
    </section>
  );
};

export default App;
