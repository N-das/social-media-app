import React, { useContext, useState } from "react";
import logo from "../images/Brand.png";
import "../style/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import { IoArrowBack } from "react-icons/io5";

const ForgetPassword = () => {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const notifyA = (err) => toast.error(err);
  const notifyB = (err) => toast.success(err);

  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    if (!emailValidation.test(email)) {
      // console.log("true");
      notifyA("Invalid email");
      return;
    }

    fetch("http://localhost:5000/forget-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Message send to your Email address");
          navigate("/signin");
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
              <h2>Forget Password</h2>
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
                type="submit"
                id="submit-btn"
                value="SUBMIT"
                onClick={postData}
              />
            </div>
            <div>
              <Link to="/signin">
                <IoArrowBack /> Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
