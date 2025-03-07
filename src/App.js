import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Presentation from "./components/presentation/presentation";
import Fnav from "./components/navbars/fristNavbar/fristNavbar";
import GustNavbar from "./components/navbars/gustNavbar/guestNabar";
import UserNavbar from "./components/navbars/userNavbar/userNavbar";
import Footer from "./components/footer/footer";

import {
  Home,
  Error,
  LogIn,
  SignUp,
  Contact,
  About,
  Cart,
  Account,
} from "./pages/pages";

function App() {
  const [Data, setData] = useState({
    Access: false,
    Cart: [],
    Products: [],
  });

  // Fetch data from Flask backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/products") // Change this if your backend is hosted elsewhere
      .then((response) => response.json())
      .then((data) =>
        setData((prev) => ({
          ...prev,
          Products: data,
        }))
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Router>
      <Presentation />
      <Fnav />
      {Data.Access ? (
        <UserNavbar Data={Data.Cart} />
      ) : (
        <GustNavbar Data={Data.Cart} />
      )}
      <Routes>
        <Route path="/" element={<Home Data={Data} SetData={setData} />} />
        <Route path="/home" element={<Home Data={Data} SetData={setData} />} />
        <Route
          path="/contact"
          element={<Contact Data={Data} SetData={setData} />}
        />
        <Route
          path="/login"
          element={
            Data.Access ? (
              <Account Data={Data} SetData={setData} />
            ) : (
              <LogIn Data={Data} SetData={setData} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            Data.Access ? (
              <Account Data={Data} SetData={setData} />
            ) : (
              <SignUp Data={Data} SetData={setData} />
            )
          }
        />
        <Route
          path="/account"
          element={
            Data.Access ? (
              <Account Data={Data} SetData={setData} />
            ) : (
              <LogIn Data={Data} SetData={setData} />
            )
          }
        />
        <Route path="/cart" element={<Cart Data={Data} SetData={setData} />} />
        <Route path="/about" element={<About Data={Data} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
