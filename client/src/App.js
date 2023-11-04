import { Alert } from "@material-tailwind/react";
import BooksTable from "./Components/BooksTable";
import NavBar from "./Components/NavBar";
import { useState } from "react";

const App = () => {
  // Alert Message Variable
  const [alert, setAlert] = useState({
    display: false,
    message: "",
    color: "",
  });

  // Function to enable and disable alerts
  const showAlert = (display, message, success) => {
    setAlert({
      ...alert,
      display: display,
      message: message,
      color: success ? "teal" : "red",
    });
    if (display) {
      setTimeout(() => {
        setAlert({
          ...alert,
          display: false,
          message: "",
          color: "",
        });
      }, 3000);
    }
  };

  return (
    <section className=" mx-auto max-w-7xl">
      <NavBar />
      {/* Alerts  */}
      {alert.display && (
        <Alert className="w-96 absolute top-2 left-1/2 transform -translate-x-1/2" color={alert.color}>
          {alert.message}{" "}
        </Alert>
      )}
      <BooksTable showAlert={showAlert} />
    </section>
  );
};

export default App;
