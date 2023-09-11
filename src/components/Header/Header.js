import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/burger-logo.png";

import "./Header.css";

export const Header = ({
  isLoggedin,
  setisLoggedin,
  setEmail,
  enable,
  setEnable,
  setPrice,
}) => {
  const navigate = useNavigate();

  const logOut = () => {
    setisLoggedin(false);
    setEnable({
      ...enable,
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    });
    setPrice(3.0);
    setEmail("");
    navigate("/");
  };

  return (
    <header className="nav">
      <img className="logo" src={logo} alt="Burger Logo" />

      <nav className="nav-item">
        <ul>
          <li>
            <NavLink to="/" className="link" replace end>
              Burger Builder
            </NavLink>
          </li>
          {isLoggedin && (
            <li>
              <NavLink to="/orders" className="link" replace end>
                Orders
              </NavLink>
            </li>
          )}
          {isLoggedin ? (
            <li onClick={logOut}>Logout</li>
          ) : (
            <li>
              <NavLink to="/login" className="link" replace end>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
