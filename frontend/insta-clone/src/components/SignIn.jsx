import React, { useContext, useState } from "react";
import logo from "../images/Brand.png";
import "../style/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

const SignIn = () => {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (err) => toast.error(err);
  const notifyB = (err) => toast.success(err);

  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    if (!emailValidation.test(email)) {
      // console.log("true");
      notifyA("Invalid email");
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed in successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }

        console.log(data);
      });
  };

  return (
    <div className="signup">
      <div>
        <div className="form">
          <div className="loginForm">
            <img className="signup-Logo" src={logo} alt="" />
            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
              />
            </div>
            <div>
              <input
                type="submit"
                id="submit-btn"
                value="sign-in"
                onClick={postData}
              />
            </div>
            <div>
              <p>
                Forget password ?{" "}
                <Link
                  to="/forget-password"
                  style={{ fontSize: "1rem", color: "#1773EA" }}
                >
                  click here
                </Link>
                <a href="#" style={{ fontSize: "1rem", color: "#1773EA" }}></a>
              </p>
            </div>
          </div>
        </div>
        <div className="form2">
          don't Have an account ?{" "}
          <Link to="/SignUp">
            <span
              style={{ color: "#1773EA", cursor: "pointer", fontSize: "1rem" }}
            >
              Sign-up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
