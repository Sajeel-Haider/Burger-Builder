import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Main } from "../Main/Main";
import "./CheckoutPage.css";

export const CheckoutPage = ({ enable, setEnable, email, price, setPrice }) => {
  const navigate = useNavigate();
  const [contactData, setcontactData] = useState({
    name: "",
    street: "",
    zipCode: "",
    country: "",
    email: "",
    shipping: "fastest",
  });
  const [openForm, setopenForm] = useState(false);
  const [formFilled, setformFilled] = useState(false);

  const loadContactForm = () => {
    setopenForm(true);
    navigate("/checkout/contact-data");
  };

  const cancelOrder = () => {
    setEnable({
      ...enable,
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    });
    setPrice(3.0);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem(email));

    const data = {
      name: contactData.name,
      street: contactData.street,
      zipcode: contactData.zipCode,
      country: contactData.country,
      email: contactData.email,
      shipping: contactData.shipping,
    };

    const orders = {
      cost: price,
      lettuce: enable.lettuce,
      bacon: enable.bacon,
      cheese: enable.cheese,
      meat: enable.meat,
    };

    let dataArr = [];
    let ordersArr = [];

    if (storedData) {
      dataArr = storedData.dataArr || [];
      ordersArr = storedData.ordersArr || [];
    }

    dataArr.push(data);
    ordersArr.push(orders);

    const info = {
      mail: email,
      pass: storedData.pass,
      dataArr,
      ordersArr,
    };

    localStorage.setItem(email, JSON.stringify(info));

    setformFilled(true);
    setEnable({
      ...enable,
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    });
    setPrice(3.0);
    navigate("/");
  };

  const handleInputChange = (e) => {
    setcontactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="check-page-container">
      <h1>We hope it tastes well!</h1>
      <Main enable={enable} setEnable={setEnable} />
      <div className="check-page-btn">
        <button style={{ color: "red" }} className="bold" onClick={cancelOrder}>
          Cancel
        </button>
        <button
          style={{ color: "green" }}
          className="bold"
          onClick={loadContactForm}
        >
          Continue
        </button>
      </div>
      {openForm && (
        <form className="center-form" onSubmit={handleSubmit}>
          <h4>Enter your contact data</h4>
          {formFilled && <p>Invalid Info or Incomplete Info</p>}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={contactData.name}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            id="street"
            name="street"
            placeholder="Street"
            value={contactData.street}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="Zip Code"
            value={contactData.zipCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            value={contactData.country}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={contactData.email}
            onChange={handleInputChange}
            required
          />
          <select
            id="shipping"
            name="shipping"
            value={contactData.shipping}
            onChange={handleInputChange}
          >
            <option value="fastest">Fastest</option>
            <option value="cheapest">Cheapest</option>
          </select>
          <button type="submit">Order</button>
        </form>
      )}
    </div>
  );
};
