import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DetailWindow } from "../DetailWindow/DetailWindow";

import "./Footer.css";

export const Footer = ({ isLoggedin, price, setPrice, enable, setEnable }) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const navigate = useNavigate();

  const priceIncrement = (ingredient) => {
    if (ingredient === "lettuce") {
      setPrice(price + 0.5);
      setEnable({ ...enable, lettuce: enable.lettuce + 1 });
    } else if (ingredient === "bacon") {
      setPrice(price + 0.7);
      setEnable({ ...enable, bacon: enable.bacon + 1 });
    } else if (ingredient === "cheese") {
      setPrice(price + 0.4);
      setEnable({ ...enable, cheese: enable.cheese + 1 });
    } else if (ingredient === "meat") {
      setPrice(price + 1.3);
      setEnable({ ...enable, meat: enable.meat + 1 });
    }
  };

  const priceDecrement = (ingredient) => {
    if (ingredient === "lettuce") {
      if (enable.lettuce) {
        setPrice(price - 0.5);
        setEnable({ ...enable, lettuce: enable.lettuce - 1 });
      }
    } else if (ingredient === "bacon") {
      if (enable.bacon) {
        setPrice(price - 0.7);
        setEnable({ ...enable, bacon: enable.bacon - 1 });
      }
    } else if (ingredient === "cheese") {
      if (enable.cheese) {
        setPrice(price - 0.4);
        setEnable({ ...enable, cheese: enable.cheese - 1 });
      }
    } else if (ingredient === "meat") {
      if (enable.meat) {
        setPrice(price - 1.3);
        setEnable({ ...enable, meat: enable.meat - 1 });
      }
    }
  };

  const openModalWindow = () => {
    if (price > 3.0) {
      setmodalOpen(true);
    }
  };

  const openLoginPage = () => {
    navigate("/login");
  };

  return (
    <footer>
      <div className="footer-flex">
        <span>Current Price:</span>
        <span> $ {price.toFixed(2)}</span>
      </div>
      <div className="footer-flex">
        <h4>Lettuce</h4>
        <button
          className={
            Boolean(enable.lettuce)
              ? `bg-lt-brown btn-more-less `
              : `bg-lt-brown  btn-less`
          }
          disabled={Boolean(!enable.lettuce)}
          onClick={() => priceDecrement("lettuce")}
        >
          Less
        </button>
        <button
          className="bg-brown btn-more-less"
          onClick={() => priceIncrement("lettuce")}
        >
          More
        </button>
      </div>
      <div className="footer-flex">
        <h4>Bacon</h4>
        <button
          className={
            Boolean(enable.bacon)
              ? `bg-lt-brown btn-more-less `
              : `bg-lt-brown  btn-less`
          }
          disabled={Boolean(!enable.bacon)}
          onClick={() => priceDecrement("bacon")}
        >
          Less
        </button>
        <button
          className="bg-brown btn-more-less"
          onClick={() => priceIncrement("bacon")}
        >
          More
        </button>
      </div>
      <div className="footer-flex">
        <h4>Cheese</h4>
        <button
          className={
            Boolean(enable.cheese)
              ? `bg-lt-brown btn-more-less `
              : `bg-lt-brown  btn-less`
          }
          disabled={Boolean(!enable.cheese)}
          onClick={() => priceDecrement("cheese")}
        >
          Less
        </button>
        <button
          className="bg-brown btn-more-less"
          onClick={() => priceIncrement("cheese")}
        >
          More
        </button>
      </div>
      <div className="footer-flex">
        <h4>Meat</h4>
        <button
          className={
            Boolean(enable.meat)
              ? `bg-lt-brown btn-more-less `
              : `bg-lt-brown  btn-less`
          }
          disabled={Boolean(!enable.meat)}
          onClick={() => priceDecrement("meat")}
        >
          Less
        </button>
        <button
          className="bg-brown btn-more-less"
          onClick={() => priceIncrement("meat")}
        >
          More
        </button>
      </div>
      <div>
        {isLoggedin ? (
          <button
            className={
              enable.lettuce || enable.bacon || enable.cheese || enable.meat
                ? `btn-order hover-btn-order`
                : `btn-order`
            }
            onClick={openModalWindow}
          >
            Order
          </button>
        ) : (
          <button className="btn-order" onClick={openLoginPage}>
            Sign Up to Order
          </button>
        )}
      </div>
      {modalOpen && (
        <DetailWindow
          price={price}
          enable={enable}
          setmodalOpen={setmodalOpen}
        />
      )}
    </footer>
  );
};
