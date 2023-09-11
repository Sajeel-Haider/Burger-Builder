import { useEffect, useState } from "react";
import "./Orders.css";

export const Orders = ({ email }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(email));

    if (storedData && storedData.ordersArr) {
      setOrders(storedData.ordersArr);
    }
  }, [email]);

  return (
    <>
      {orders.length ? (
        orders.map((order, index) => (
          <div key={index} className="order-container">
            <div className="ingr-container">
              <p>Ingredients</p>
              <p>Bacon: {order.bacon}</p>
              <p>Cheese: {order.cheese}</p>
              <p>Lettuce: {order.lettuce}</p>
              <p>Meat: {order.meat}</p>
            </div>
            <div className="price-container">
              <p className="bold">Price: ${order.cost.toFixed(2)}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="ingr-container">
          <p>No Orders Found</p>
        </div>
      )}
    </>
  );
};
