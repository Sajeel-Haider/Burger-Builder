import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";
import { Login } from "./components/Login/Login";
import { Orders } from "./components/Orders/Orders";
import { CheckoutPage } from "./components/CheckoutPage/CheckoutPage";

function App() {
  const [price, setPrice] = useState(3);
  const [enable, setEnable] = useState({
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
  const [email, setEmail] = useState("");
  const [isLoggedin, setisLoggedin] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setisLoggedin(true);
      setEmail(loggedInUser);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      localStorage.setItem("loggedInUser", email);
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [isLoggedin, email]);

  return (
    <div className="App">
      <Header
        isLoggedin={isLoggedin}
        setisLoggedin={setisLoggedin}
        setEmail={setEmail}
        enable={enable}
        setEnable={setEnable}
        setPrice={setPrice}
      />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setisLoggedin={setisLoggedin}
              email={email}
              setEmail={setEmail}
              enable={enable}
              setEnable={setEnable}
              setPrice={setPrice}
            />
          }
        />
        <Route
          path="/"
          element={
            <MainWrapper
              isLoggedin={isLoggedin}
              price={price}
              setPrice={setPrice}
              enable={enable}
              setEnable={setEnable}
            />
          }
        />
        <Route path="/orders" element={<Orders email={email} />}></Route>
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              enable={enable}
              setEnable={setEnable}
              email={email}
              price={price}
              setPrice={setPrice}
            />
          }
        ></Route>
        <Route
          path="/checkout/contact-data"
          element={
            <CheckoutPage
              enable={enable}
              setEnable={setEnable}
              email={email}
              setEmail={setEmail}
              price={price}
              setPrice={setPrice}
            />
          }
        ></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

const MainWrapper = ({ isLoggedin, price, setPrice, enable, setEnable }) => {
  return (
    <>
      <Main enable={enable} />
      <Footer
        isLoggedin={isLoggedin}
        price={price}
        setPrice={setPrice}
        enable={enable}
        setEnable={setEnable}
      />
    </>
  );
};

export default App;
