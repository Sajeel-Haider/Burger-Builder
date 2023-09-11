import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export const Login = ({
  setisLoggedin,
  email,
  setEmail,
  enable,
  setEnable,
  setPrice,
}) => {
  const [checkIncorrPass, setcheckIncorrPass] = useState(false);
  const [password, setPassword] = useState("");
  const [checkPassLen, setcheckPassLen] = useState(true);
  const [checkSignUp, setcheckSignUp] = useState(false);
  const [checkcreateAcc, setcheckcreateAcc] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      const checkPass = JSON.parse(localStorage.getItem(email));
      if (checkPass) {
        setcheckSignUp(true);
        if (checkPass.pass === password) {
          setisLoggedin(true);
          navigate("/");
        } else {
          setcheckIncorrPass(true);
        }
      } else {
        setcheckSignUp(false);
        setcheckcreateAcc(true);
      }
    }
  };

  const handleSignUp = (e) => {
    if (email && password) {
      if (localStorage.getItem(email)) {
        setcheckSignUp(true);
      } else {
        if (password.length > 8) {
          console.log(password);
          const info = {
            mail: email,
            pass: password,
            orders: "",
            data: "",
          };
          localStorage.setItem(email, JSON.stringify(info));
          setisLoggedin(true);
          setEnable({
            ...enable,
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
          });
          setPrice(3.0);
          navigate("/");
        }
      }
    }
  };

  const checkPassword = (e) => {
    setPassword(e.target.value);

    if (password.length <= 8) {
      setcheckPassLen(false);
    } else {
      setcheckPassLen(true);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {checkIncorrPass ? (
          <div className="len-message">Your Passowrd is Incorrect</div>
        ) : (
          ""
        )}
        {checkPassLen ? (
          ""
        ) : (
          <div className="len-message">Your password is too short</div>
        )}
        {checkSignUp ? (
          <div className="len-message">You alread have an account</div>
        ) : (
          ""
        )}
        {checkcreateAcc ? (
          <div className="len-message">You must signup to continue</div>
        ) : (
          ""
        )}
        <input
          type="email"
          name="email"
          placeholder="E-mail Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={checkPassword}
        />
        <div className="log-btn">
          <button className="sub-btn" type="submit">
            Submit
          </button>
          <button className="signup-btn" type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
