import { useNavigate } from "react-router-dom";

import "./DetailWindow.css";

export const DetailWindow = ({ price, enable, setmodalOpen }) => {
  const navigate = useNavigate();

  const openCheckOutWindow = () => {
    navigate("/checkout");
  };

  return (
    <div className="detail-window-container">
      <div className="detail-window">
        <h3>Your Order Summary</h3>
        <ul>
          <li>Lettuce {enable.lettuce}</li>
          <li>Bacon {enable.bacon}</li>
          <li>Cheese {enable.cheese}</li>
          <li>Meat {enable.meat}</li>
        </ul>
        <h3>Total Price: ${price.toFixed(2)}</h3>
        <p>Continue to Checkout</p>
        <button
          style={{ color: "red " }}
          className="bold"
          onClick={() => setmodalOpen(false)}
        >
          Cancel
        </button>
        <button
          style={{ color: "green " }}
          className="bold"
          onClick={openCheckOutWindow}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
